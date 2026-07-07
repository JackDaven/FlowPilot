import { decryptAesGcm, encryptAesGcm } from "../../lib/tools/aes";
import { decodeBase64, encodeBase64 } from "../../lib/tools/base64";
import { copyText, downloadText } from "../../lib/tools/browser-action";
import {
  binaryToText,
  compareHashes,
  convertCase,
  convertTimestamp,
  countCharacters,
  countWords,
  createSlug,
  decodeHtmlEntities,
  decodeUnicodeEscapes,
  digestText,
  encodeHtmlEntities,
  encodeUnicodeEscapes,
  generateUuid,
  hexToText,
  jsonToYaml,
  removeDuplicateLines,
  sortLines,
  testRegex,
  textToBinary,
  textToHex,
  validateJson,
  yamlToJson
} from "../../lib/tools/extended";
import { formatJson } from "../../lib/tools/js-tools";
import { md5Hash } from "../../lib/tools/md5";
import { decodeMorse, encodeMorse } from "../../lib/tools/morse";
import { defaultToolId, type ToolDefinition } from "../../lib/tools/registry";
import { decodeUrlComponent, encodeUrlComponent } from "../../lib/tools/url-encode";

type OutputState = { label: string; value: string };
type InitToolsHubOptions = {
  initialToolId?: string;
  hashMode?: boolean;
};
type ActionKind = "primary" | "secondary";

const legacyToolIds: Record<string, string> = {
  "js-tools": "json-tools"
};

const toolPath = (id: string) => `/tools#${id}`;

const normalizeToolId = (id: string | undefined, byId: Record<string, ToolDefinition>) => {
  if (!id) return defaultToolId;
  const normalized = legacyToolIds[id] ?? id;
  return byId[normalized] ? normalized : defaultToolId;
};

const parseHashId = (byId: Record<string, ToolDefinition>) => {
  const hash = location.hash.replace(/^#/, "");
  return normalizeToolId(hash, byId);
};

export const initToolsHub = (registry: ToolDefinition[], options: InitToolsHubOptions = {}) => {
  const byId = Object.fromEntries(registry.map((tool) => [tool.id, tool]));
  const tabs = document.querySelectorAll<HTMLAnchorElement>("[data-tool-tab]");
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>("[data-tool-sidebar]");
  const breadcrumb = document.querySelector("[data-breadcrumb-current]");
  const nameEl = document.querySelector("[data-tool-name]");
  const statusEl = document.querySelector("[data-tool-status]");
  const introEl = document.querySelector("[data-tool-intro]");
  const guideEl = document.querySelector("[data-tool-guide]");
  const exampleInputEl = document.querySelector("[data-tool-example-input]");
  const exampleOutputEl = document.querySelector("[data-tool-example-output]");
  const activeLabel = document.querySelector("[data-active-tool-label]");
  const inputEl = document.querySelector<HTMLTextAreaElement>("[data-tool-input]");
  const outputEl = document.querySelector("[data-tool-output]");
  const outputState = document.querySelector("[data-output-state]");
  const passphraseWrap = document.querySelector<HTMLElement>("[data-tool-passphrase-wrap]");
  const passphraseEl = document.querySelector<HTMLInputElement>("[data-tool-passphrase]");
  const primaryButton = document.querySelector<HTMLButtonElement>("[data-tool-encrypt]");
  const secondaryButton = document.querySelector<HTMLButtonElement>("[data-tool-decrypt]");
  const clearButton = document.querySelector("[data-tool-clear]");

  const hashMode = options.hashMode ?? true;
  let activeToolId = normalizeToolId(options.initialToolId, byId);

  const activeTool = () => byId[activeToolId] || byId[defaultToolId];

  const setOutput = ({ label, value }: OutputState) => {
    if (outputState) outputState.textContent = label;
    if (outputEl) outputEl.textContent = value || "Output will appear here";
  };

  const setActiveTool = (id: string) => {
    const tool = byId[normalizeToolId(id, byId)] || byId[defaultToolId];
    activeToolId = tool.id;

    const nextUrl = toolPath(tool.id);
    if (hashMode && `${location.pathname}${location.hash}` !== nextUrl) {
      history.replaceState(null, "", nextUrl);
    }

    if (breadcrumb) breadcrumb.textContent = tool.name;
    if (nameEl) nameEl.textContent = tool.name;
    if (statusEl) {
      statusEl.textContent = tool.status;
      statusEl.className = `rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] ${
        tool.status === "local" ? "bg-emerald-50 text-emerald-600" : "bg-[#F1EEFF] text-[#6D5DFC]"
      }`;
    }
    if (introEl) introEl.textContent = tool.intro;
    if (guideEl) guideEl.textContent = tool.guide;
    if (exampleInputEl) exampleInputEl.textContent = tool.example.input;
    if (exampleOutputEl) exampleOutputEl.textContent = tool.example.output;
    if (activeLabel) activeLabel.textContent = tool.label;
    if (inputEl) inputEl.placeholder = tool.placeholder ?? "Enter text to process";
    if (primaryButton) primaryButton.textContent = tool.actions.primary;
    if (secondaryButton) {
      secondaryButton.textContent = tool.actions.secondary ?? "";
      secondaryButton.classList.toggle("hidden", !tool.actions.secondary);
    }
    if (passphraseWrap) passphraseWrap.classList.toggle("hidden", tool.id !== "aes");

    const markActive = (el: Element, isActive: boolean) => {
      el.classList.toggle("bg-[#6D5DFC]", isActive);
      el.classList.toggle("text-white", isActive);
      el.classList.toggle("border-[#6D5DFC]", isActive);
      el.classList.toggle("bg-white", !isActive);
      el.classList.toggle("text-[#756F86]", !isActive);
    };

    tabs.forEach((tab) => markActive(tab, tab.dataset.toolTab === tool.id));
    sidebarLinks.forEach((link) => markActive(link, link.dataset.toolSidebar === tool.id));

    setOutput({ label: "Ready", value: "Output will appear here" });
  };

  const navigateToTool = (id: string, push = true) => {
    if (!hashMode) return;
    const nextUrl = toolPath(normalizeToolId(id, byId));
    if (push) history.pushState(null, "", nextUrl);
    setActiveTool(id);
  };

  const runTool = async (kind: ActionKind) => {
    const tool = activeTool();
    const value = inputEl?.value ?? "";
    if (tool.requiresInput !== false && !value.trim()) {
      return setOutput({ label: "Empty", value: "Enter text to process first." });
    }

    try {
      switch (tool.id) {
        case "md5":
          return setOutput({ label: "MD5", value: md5Hash(value) });
        case "sha1":
          return setOutput({ label: "SHA-1", value: await digestText("SHA-1", value) });
        case "sha256":
          return setOutput({ label: "SHA-256", value: await digestText("SHA-256", value) });
        case "sha512":
          return setOutput({ label: "SHA-512", value: await digestText("SHA-512", value) });
        case "hash-compare":
          return setOutput({ label: "Compare", value: compareHashes(value) });
        case "base64":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: decodeBase64(value) } : { label: "Base64", value: encodeBase64(value) });
        case "html-entity":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: decodeHtmlEntities(value) } : { label: "Encoded", value: encodeHtmlEntities(value) });
        case "unicode-converter":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: decodeUnicodeEscapes(value) } : { label: "Encoded", value: encodeUnicodeEscapes(value) });
        case "hex-text":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: hexToText(value) } : { label: "Hex", value: textToHex(value) });
        case "text-binary":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: binaryToText(value) } : { label: "Binary", value: textToBinary(value) });
        case "aes": {
          const passphrase = passphraseEl?.value?.trim();
          if (!passphrase) return setOutput({ label: "Missing key", value: "Enter an AES passphrase first." });
          return setOutput(
            kind === "secondary"
              ? { label: "Decrypted", value: await decryptAesGcm(value, passphrase) }
              : { label: "AES", value: await encryptAesGcm(value, passphrase) }
          );
        }
        case "morse":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: decodeMorse(value) } : { label: "Morse", value: encodeMorse(value) });
        case "url-encode":
          return setOutput(kind === "secondary" ? { label: "Decoded", value: decodeUrlComponent(value) } : { label: "Encoded", value: encodeUrlComponent(value) });
        case "json-tools":
          return setOutput(kind === "secondary" ? { label: "Minified", value: JSON.stringify(JSON.parse(value)) } : { label: "Formatted", value: formatJson(value) });
        case "json-validator":
          return setOutput({ label: "Valid", value: validateJson(value) });
        case "json-yaml":
          return setOutput({ label: "YAML", value: jsonToYaml(value) });
        case "yaml-json":
          return setOutput({ label: "JSON", value: yamlToJson(value) });
        case "uuid-generator":
          return setOutput({ label: "UUID", value: generateUuid() });
        case "timestamp-converter":
          return setOutput({ label: "Timestamp", value: convertTimestamp(value) });
        case "regex-tester":
          return setOutput({ label: "Matches", value: testRegex(value) });
        case "word-counter":
          return setOutput({ label: "Count", value: countWords(value) });
        case "character-counter":
          return setOutput({ label: "Count", value: countCharacters(value) });
        case "slug-generator":
          return setOutput({ label: "Slug", value: createSlug(value) });
        case "case-converter":
          return setOutput({ label: "Cases", value: convertCase(value) });
        case "remove-duplicate-lines":
          return setOutput({ label: "Processed", value: removeDuplicateLines(value) });
        case "sort-lines":
          return setOutput({ label: "Sorted", value: sortLines(value) });
        case "browser-action": {
          if (kind === "secondary") {
            const saved = downloadText(value, "flowpilot-export.txt");
            return setOutput({
              label: saved ? "Downloaded" : "Failed",
              value: saved ? "Input text has been downloaded." : "Download failed. Enter text and try again."
            });
          }
          const copied = await copyText(value);
          return setOutput({
            label: copied ? "Copied" : "Failed",
            value: copied ? "Input text has been copied to the clipboard." : "Copy failed. Check your browser permission."
          });
        }
        default:
          return setOutput({ label: "Dev", value: `${tool.name} is currently in development.` });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Processing failed. Check the input and try again.";
      setOutput({ label: "Error", value: message });
    }
  };

  const onToolLinkClick = (event: Event, id: string | undefined) => {
    if (!id || !hashMode) return;
    event.preventDefault();
    navigateToTool(id);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => onToolLinkClick(event, tab.dataset.toolTab));
  });
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => onToolLinkClick(event, link.dataset.toolSidebar));
  });

  if (hashMode) {
    window.addEventListener("hashchange", () => setActiveTool(parseHashId(byId)));
    window.addEventListener("popstate", () => setActiveTool(parseHashId(byId)));
  }

  primaryButton?.addEventListener("click", () => void runTool("primary"));
  secondaryButton?.addEventListener("click", () => void runTool("secondary"));
  clearButton?.addEventListener("click", () => {
    if (inputEl) inputEl.value = "";
    if (passphraseEl) passphraseEl.value = "";
    setOutput({ label: "Ready", value: "Output will appear here" });
  });

  setActiveTool(hashMode ? parseHashId(byId) : activeToolId);
};
