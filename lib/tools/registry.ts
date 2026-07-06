export type ToolStatus = "local" | "dev";

export type ToolDefinition = {
  id: string;
  label: string;
  status: ToolStatus;
  name: string;
  intro: string;
  guide: string;
};

export const toolsRegistry: ToolDefinition[] = [
  {
    id: "md5",
    label: "MD5",
    status: "local",
    name: "MD5 Hash Generator",
    intro: "Generate a lowercase MD5 digest from browser text input.",
    guide: "Paste text into the input area, then click Encrypt to generate an MD5 hash."
  },
  {
    id: "base64",
    label: "Base64",
    status: "local",
    name: "Base64 Encoder / Decoder",
    intro: "Convert UTF-8 text to Base64 and decode Base64 back to text.",
    guide: "Use Encrypt to encode text. Use Decrypt to decode a valid Base64 string."
  },
  {
    id: "aes",
    label: "AES",
    status: "local",
    name: "AES-GCM Encrypt / Decrypt",
    intro: "Encrypt text locally with browser Web Crypto AES-GCM.",
    guide: "Enter plain text and a passphrase, then click Encrypt. Paste an AES payload to Decrypt."
  },
  {
    id: "morse",
    label: "Morse",
    status: "local",
    name: "Morse Code Translator",
    intro: "Translate English text and numbers to Morse code.",
    guide: "Use Encrypt to encode text to Morse. Use Decrypt to decode Morse back to text."
  },
  {
    id: "browser-action",
    label: "Browser Action",
    status: "local",
    name: "Browser Action Tools",
    intro: "Browser clipboard, download, and local history utilities.",
    guide: "Encrypt copies input to clipboard. Decrypt downloads input as a text file."
  },
  {
    id: "url-encode",
    label: "URL Encode",
    status: "local",
    name: "URL Encode / Decode",
    intro: "Encode URLs, query strings, and special characters for safe transport.",
    guide: "Use Encrypt to URL-encode text. Use Decrypt to decode percent-encoded strings."
  },
  {
    id: "js-tools",
    label: "JS Tools",
    status: "local",
    name: "JavaScript Tools",
    intro: "Small utilities for JavaScript formatting, escaping, and developer workflows.",
    guide: "Encrypt formats JSON. Decrypt minifies valid JSON into a single line."
  }
];

export const defaultToolId = toolsRegistry[0]?.id ?? "md5";

export const toolsById = Object.fromEntries(toolsRegistry.map((tool) => [tool.id, tool])) as Record<
  string,
  ToolDefinition
>;
