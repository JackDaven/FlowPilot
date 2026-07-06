import { decryptAesGcm, encryptAesGcm } from "../../lib/tools/aes";
import { decodeBase64, encodeBase64 } from "../../lib/tools/base64";
import { copyText, downloadText } from "../../lib/tools/browser-action";
import { formatJson } from "../../lib/tools/js-tools";
import { md5Hash } from "../../lib/tools/md5";
import { decodeMorse, encodeMorse } from "../../lib/tools/morse";
import { defaultToolId, toolsById, type ToolDefinition } from "../../lib/tools/registry";
import { decodeUrlComponent, encodeUrlComponent } from "../../lib/tools/url-encode";

type OutputState = { label: string; value: string };

const toolPath = (id: string) => `/tools#${id}`;

const parseHashId = () => {
  const hash = location.hash.replace(/^#/, "");
  return hash && toolsById[hash] ? hash : defaultToolId;
};

export const initToolsHub = (registry: ToolDefinition[]) => {
  const byId = Object.fromEntries(registry.map((tool) => [tool.id, tool]));
  const tabs = document.querySelectorAll<HTMLAnchorElement>("[data-tool-tab]");
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>("[data-tool-sidebar]");
  const breadcrumb = document.querySelector("[data-breadcrumb-current]");
  const nameEl = document.querySelector("[data-tool-name]");
  const statusEl = document.querySelector("[data-tool-status]");
  const introEl = document.querySelector("[data-tool-intro]");
  const guideEl = document.querySelector("[data-tool-guide]");
  const activeLabel = document.querySelector("[data-active-tool-label]");
  const inputEl = document.querySelector<HTMLTextAreaElement>("[data-tool-input]");
  const outputEl = document.querySelector("[data-tool-output]");
  const outputState = document.querySelector("[data-output-state]");
  const passphraseWrap = document.querySelector<HTMLElement>("[data-tool-passphrase-wrap]");
  const passphraseEl = document.querySelector<HTMLInputElement>("[data-tool-passphrase]");
  const encryptButton = document.querySelector("[data-tool-encrypt]");
  const decryptButton = document.querySelector("[data-tool-decrypt]");
  const clearButton = document.querySelector("[data-tool-clear]");

  let activeToolId = defaultToolId;

  const setOutput = ({ label, value }: OutputState) => {
    if (outputState) outputState.textContent = label;
    if (outputEl) outputEl.textContent = value || "输出结果将在这里展示";
  };

  const setActiveTool = (id: string) => {
    const tool = byId[id] || byId[defaultToolId];
    activeToolId = tool.id;

    const nextUrl = toolPath(tool.id);
    if (`${location.pathname}${location.hash}` !== nextUrl) {
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
    if (activeLabel) activeLabel.textContent = tool.label;
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

    setOutput({ label: "Ready", value: "输出结果将在这里展示" });
  };

  const navigateToTool = (id: string, push = true) => {
    const nextUrl = toolPath(id);
    if (push) history.pushState(null, "", nextUrl);
    setActiveTool(id);
  };

  const runEncrypt = async () => {
    const value = inputEl?.value ?? "";
    if (!value.trim()) return setOutput({ label: "Empty", value: "请输入需要处理的内容" });

    try {
      switch (activeToolId) {
        case "md5":
          return setOutput({ label: "MD5", value: md5Hash(value) });
        case "base64":
          return setOutput({ label: "Base64", value: encodeBase64(value) });
        case "aes": {
          const passphrase = passphraseEl?.value?.trim();
          if (!passphrase) return setOutput({ label: "Missing key", value: "请输入 AES 密钥。" });
          return setOutput({ label: "AES", value: await encryptAesGcm(value, passphrase) });
        }
        case "morse":
          return setOutput({ label: "Morse", value: encodeMorse(value) });
        case "url-encode":
          return setOutput({ label: "Encoded", value: encodeUrlComponent(value) });
        case "js-tools":
          return setOutput({ label: "Formatted", value: formatJson(value) });
        case "browser-action": {
          const copied = await copyText(value);
          return setOutput({
            label: copied ? "Copied" : "Failed",
            value: copied ? "输入内容已复制到剪贴板。" : "复制失败，请检查浏览器权限。"
          });
        }
        default:
          return setOutput({ label: "Dev", value: `${byId[activeToolId].name} is currently in development.` });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "处理失败，请检查输入。";
      setOutput({ label: "Error", value: message });
    }
  };

  const runDecrypt = async () => {
    const value = inputEl?.value ?? "";
    if (!value.trim()) return setOutput({ label: "Empty", value: "请输入需要处理的内容" });

    try {
      switch (activeToolId) {
        case "base64":
          return setOutput({ label: "Decoded", value: decodeBase64(value) });
        case "md5":
          return setOutput({ label: "Unavailable", value: "MD5 is a one-way hash and cannot be decrypted." });
        case "aes": {
          const passphrase = passphraseEl?.value?.trim();
          if (!passphrase) return setOutput({ label: "Missing key", value: "请输入 AES 密钥。" });
          return setOutput({ label: "Decrypted", value: await decryptAesGcm(value, passphrase) });
        }
        case "morse":
          return setOutput({ label: "Decoded", value: decodeMorse(value) });
        case "url-encode":
          return setOutput({ label: "Decoded", value: decodeUrlComponent(value) });
        case "js-tools":
          return setOutput({ label: "Minified", value: JSON.stringify(JSON.parse(value)) });
        case "browser-action": {
          const saved = downloadText(value, "flowpilot-export.txt");
          return setOutput({
            label: saved ? "Downloaded" : "Failed",
            value: saved ? "输入内容已触发下载。" : "下载失败，请输入内容后重试。"
          });
        }
        default:
          return setOutput({ label: "Dev", value: `${byId[activeToolId].name} is currently in development.` });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "处理失败，请检查输入。";
      setOutput({ label: "Error", value: message });
    }
  };

  const onToolLinkClick = (event: Event, id: string | undefined) => {
    if (!id) return;
    event.preventDefault();
    navigateToTool(id);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => onToolLinkClick(event, tab.dataset.toolTab));
  });
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => onToolLinkClick(event, link.dataset.toolSidebar));
  });

  window.addEventListener("hashchange", () => setActiveTool(parseHashId()));
  window.addEventListener("popstate", () => setActiveTool(parseHashId()));

  encryptButton?.addEventListener("click", () => void runEncrypt());
  decryptButton?.addEventListener("click", () => void runDecrypt());
  clearButton?.addEventListener("click", () => {
    if (inputEl) inputEl.value = "";
    if (passphraseEl) passphraseEl.value = "";
    setOutput({ label: "Ready", value: "输出结果将在这里展示" });
  });

  const toggle = document.querySelector("[data-more-toggle]");
  const menu = document.querySelector("[data-more-menu]");
  toggle?.addEventListener("click", () => {
    const isOpen = menu?.classList.contains("opacity-100");
    menu?.classList.toggle("pointer-events-none", isOpen);
    menu?.classList.toggle("opacity-0", isOpen);
    menu?.classList.toggle("translate-y-2", isOpen);
    menu?.classList.toggle("opacity-100", !isOpen);
    menu?.classList.toggle("translate-y-0", !isOpen);
  });

  setActiveTool(parseHashId());
};
