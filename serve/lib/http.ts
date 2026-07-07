export const ok = <T>(data: T) => ({
  ok: true,
  data
});

export const notReady = (moduleId: string) => ({
  ok: false,
  code: "MODULE_NOT_READY",
  moduleId,
  message: "This module is reserved and has not been connected yet."
});

export const sanitize = (value: unknown, max = 120) =>
  String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
