export const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  return btoa(String.fromCharCode(...bytes));
};

export const decodeBase64 = (value: string) => {
  const bytes = Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};
