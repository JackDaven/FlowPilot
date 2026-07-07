const morseMap: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...",
  T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-."
};

const textMap = Object.fromEntries(Object.entries(morseMap).map(([key, value]) => [value, key]));

export const encodeMorse = (value: string) =>
  value
    .toUpperCase()
    .split("")
    .map((char) => char === " " ? "/" : morseMap[char] || "")
    .filter(Boolean)
    .join(" ");

export const decodeMorse = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .map((code) => code === "/" ? " " : textMap[code] || "")
    .join("")
    .replace(/\s+/g, " ")
    .trim();
