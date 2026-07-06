const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toBase64 = (bytes: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const fromBase64 = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
const toArrayBuffer = (bytes: Uint8Array) =>
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

const deriveKey = async (secret: string, salt: Uint8Array) => {
  const material = await crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: toArrayBuffer(salt), iterations: 120000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptAesGcm = async (plainText: string, passphrase: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, key, encoder.encode(plainText));
  return `${toBase64(salt)}.${toBase64(iv)}.${toBase64(encrypted)}`;
};

export const decryptAesGcm = async (payload: string, passphrase: string) => {
  const [saltText, ivText, cipherText] = payload.trim().split(".");
  if (!saltText || !ivText || !cipherText) throw new Error("Invalid AES payload");

  const salt = fromBase64(saltText);
  const iv = fromBase64(ivText);
  const cipher = fromBase64(cipherText);
  const key = await deriveKey(passphrase, salt);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, key, toArrayBuffer(cipher));
  return decoder.decode(decrypted);
};
