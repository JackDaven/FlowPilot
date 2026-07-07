export const formatJson = (value: string) => JSON.stringify(JSON.parse(value), null, 2);

export const escapeJavaScriptString = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
