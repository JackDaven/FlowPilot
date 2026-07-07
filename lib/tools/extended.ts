import { stringify as stringifyYaml, parse as parseYaml } from "yaml";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

export const digestText = async (algorithm: "SHA-1" | "SHA-256" | "SHA-512", value: string) => {
  const hash = await crypto.subtle.digest(algorithm, encoder.encode(value));
  return toHex(new Uint8Array(hash));
};

export const compareHashes = (value: string) => {
  const [first = "", second = ""] = value.split(/\r?\n/).map((line) => line.trim());
  if (!first || !second) throw new Error("Enter two hashes on separate lines.");
  const matches = first.toLowerCase() === second.toLowerCase();
  return matches
    ? "Match: the two hashes are identical after trimming and case normalization."
    : "No match: the two hashes are different.";
};

export const encodeHtmlEntities = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const decodeHtmlEntities = (value: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
};

export const encodeUnicodeEscapes = (value: string) =>
  Array.from(value)
    .map((char) => {
      const code = char.codePointAt(0) ?? 0;
      if (code <= 0xffff) return `\\u${code.toString(16).padStart(4, "0")}`;
      return `\\u{${code.toString(16)}}`;
    })
    .join("");

export const decodeUnicodeEscapes = (value: string) =>
  value
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));

export const textToHex = (value: string) =>
  Array.from(encoder.encode(value), (byte) => byte.toString(16).padStart(2, "0")).join(" ");

export const hexToText = (value: string) => {
  const normalized = value.replace(/[^0-9a-fA-F]/g, "");
  if (!normalized || normalized.length % 2 !== 0) throw new Error("Enter a valid even-length hex string.");
  const bytes = new Uint8Array(normalized.match(/.{2}/g)?.map((part) => Number.parseInt(part, 16)) ?? []);
  return decoder.decode(bytes);
};

export const textToBinary = (value: string) =>
  Array.from(encoder.encode(value), (byte) => byte.toString(2).padStart(8, "0")).join(" ");

export const binaryToText = (value: string) => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length || parts.some((part) => !/^[01]{8}$/.test(part))) {
    throw new Error("Enter binary as 8-bit groups separated by spaces.");
  }
  return decoder.decode(new Uint8Array(parts.map((part) => Number.parseInt(part, 2))));
};

export const validateJson = (value: string) => `Valid JSON\n${JSON.stringify(JSON.parse(value), null, 2)}`;

export const jsonToYaml = (value: string) => stringifyYaml(JSON.parse(value));

export const yamlToJson = (value: string) => JSON.stringify(parseYaml(value), null, 2);

export const generateUuid = () => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = toHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const convertTimestamp = (value: string) => {
  const input = value.trim();
  const date = input
    ? /^\d+$/.test(input)
      ? new Date(input.length >= 13 ? Number(input) : Number(input) * 1000)
      : new Date(input)
    : new Date();

  if (Number.isNaN(date.getTime())) throw new Error("Enter a valid Unix timestamp or date string.");
  return [`ISO: ${date.toISOString()}`, `Unix seconds: ${Math.floor(date.getTime() / 1000)}`, `Unix milliseconds: ${date.getTime()}`].join("\n");
};

export const testRegex = (value: string) => {
  const [patternLine = "", ...textLines] = value.split(/\r?\n/);
  const match = patternLine.match(/^\/(.+)\/([dgimsuvy]*)$/);
  if (!match) throw new Error("First line must use /pattern/flags format.");

  const flags = match[2].includes("g") ? match[2] : `${match[2]}g`;
  const regex = new RegExp(match[1], flags);
  const text = textLines.join("\n");
  const matches = Array.from(text.matchAll(regex));

  if (!matches.length) return "0 matches";
  return [
    `${matches.length} ${matches.length === 1 ? "match" : "matches"}`,
    ...matches.map((item, index) => {
      const groups = item.slice(1).length ? ` groups: ${JSON.stringify(item.slice(1))}` : "";
      return `${index + 1}. ${item[0]} at index ${item.index ?? 0}${groups}`;
    })
  ].join("\n");
};

export const countWords = (value: string) => {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const spaces = (value.match(/\s/g) ?? []).length;
  const lines = value.length ? value.split(/\r?\n/).length : 0;
  return [`Words: ${words}`, `Characters: ${value.length}`, `Characters excluding spaces: ${value.replace(/\s/g, "").length}`, `Spaces: ${spaces}`, `Lines: ${lines}`].join("\n");
};

export const countCharacters = (value: string) => {
  const spaces = (value.match(/ /g) ?? []).length;
  const lines = value.length ? value.split(/\r?\n/).length : 0;
  return [`Characters: ${value.length}`, `Characters excluding spaces: ${value.replace(/ /g, "").length}`, `Spaces: ${spaces}`, `Lines: ${lines}`].join("\n");
};

export const createSlug = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const wordsFrom = (value: string) => value.trim().toLowerCase().split(/[^a-zA-Z0-9]+/).filter(Boolean);
const titleCase = (value: string) =>
  wordsFrom(value)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

export const convertCase = (value: string) => {
  const words = wordsFrom(value);
  const camel = words.map((word, index) => (index === 0 ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)).join("");
  return [
    `lower case: ${value.toLowerCase()}`,
    `UPPER CASE: ${value.toUpperCase()}`,
    `Title Case: ${titleCase(value)}`,
    `camelCase: ${camel}`,
    `kebab-case: ${words.join("-")}`,
    `snake_case: ${words.join("_")}`
  ].join("\n");
};

export const removeDuplicateLines = (value: string) => {
  const seen = new Set<string>();
  return value
    .split(/\r?\n/)
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    })
    .join("\n");
};

export const sortLines = (value: string) => value.split(/\r?\n/).sort((a, b) => a.localeCompare(b)).join("\n");
