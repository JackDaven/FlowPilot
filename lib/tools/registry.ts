export type ToolStatus = "local" | "dev";

export type ToolExample = {
  input: string;
  output: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolActionLabels = {
  primary: string;
  secondary?: string;
};

export type ToolDefinition = {
  id: string;
  slug: string;
  label: string;
  status: ToolStatus;
  category: string;
  categorySlug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  guide: string;
  longDescription: string;
  useCases: string[];
  steps: string[];
  example: ToolExample;
  faqs: ToolFaq[];
  relatedToolIds: string[];
  actions: ToolActionLabels;
  requiresInput?: boolean;
  placeholder?: string;
};

export type ToolCategoryDefinition = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
};

export const toolCategoryDefinitions: ToolCategoryDefinition[] = [
  {
    slug: "hash",
    name: "Hash Tools",
    seoTitle: "Free Hash Tools Online | FlowPilot",
    seoDescription: "Generate and compare common hashes such as MD5, SHA-1, SHA-256, and SHA-512 directly in your browser.",
    h1: "Free Hash Tools Online",
    intro: "Generate checksums, create browser-based SHA hashes, and compare hash values without uploading your text."
  },
  {
    slug: "encoding",
    name: "Encoding Tools",
    seoTitle: "Free Encoding and Decoding Tools Online | FlowPilot",
    seoDescription: "Encode and decode Base64, URLs, HTML entities, Unicode, binary, and other text formats online.",
    h1: "Free Encoding and Decoding Tools Online",
    intro: "Convert text between common encoding formats used in APIs, web pages, configuration files, and debugging workflows."
  },
  {
    slug: "encryption",
    name: "Encryption Tools",
    seoTitle: "Free Browser-Based Encryption Tools | FlowPilot",
    seoDescription: "Use browser-based encryption and decryption utilities for text workflows, testing, and secure local experiments.",
    h1: "Free Browser-Based Encryption Tools",
    intro: "Run simple local encryption experiments and text protection workflows with browser-based utilities."
  },
  {
    slug: "developer",
    name: "Developer Tools",
    seoTitle: "Free Developer Tools Online | FlowPilot",
    seoDescription: "Format, validate, convert, and debug common developer data formats such as JSON, YAML, timestamps, UUIDs, and regex.",
    h1: "Free Developer Tools Online",
    intro: "Format, validate, convert, and debug everyday developer data directly in the browser."
  },
  {
    slug: "text",
    name: "Text Tools",
    seoTitle: "Free Text Tools Online | FlowPilot",
    seoDescription: "Count, clean, convert, sort, compare, and transform text directly in your browser.",
    h1: "Free Text Tools Online",
    intro: "Clean, count, sort, and transform text for writing, publishing, QA, and content operations."
  },
  {
    slug: "web",
    name: "Web Tools",
    seoTitle: "Free Web Tools Online | FlowPilot",
    seoDescription: "Use simple browser-based web utilities for URLs, QR codes, colors, CSS, HTML, and page development workflows.",
    h1: "Free Web Tools Online",
    intro: "Use small browser utilities for web page development, local file actions, and practical front-end workflows."
  }
];

const C = Object.fromEntries(toolCategoryDefinitions.map((category) => [category.slug, category])) as Record<
  string,
  ToolCategoryDefinition
>;

const faq = (tool: string, output: string): ToolFaq[] => [
  { question: `Does the ${tool} upload my input?`, answer: "No. FlowPilot runs this utility in your browser whenever possible." },
  { question: `What should I paste into the ${tool}?`, answer: "Paste the text, data, or two-line input described in the example section." },
  { question: `Can I use the ${tool} for debugging?`, answer: `Yes. It is designed for quick checks, conversions, and workflow debugging. ${output}` }
];

const t = (tool: ToolDefinition) => tool;

export const toolsRegistry: ToolDefinition[] = [
  t({
    id: "md5",
    slug: "md5-generator",
    label: "MD5",
    status: "local",
    category: C.hash.name,
    categorySlug: C.hash.slug,
    name: "MD5 Hash Generator",
    seoTitle: "Free MD5 Hash Generator Online | FlowPilot",
    seoDescription: "Generate lowercase MD5 hashes instantly in your browser. Free online MD5 generator with no signup and no server upload.",
    h1: "Free MD5 Hash Generator Online",
    intro: "Generate a lowercase MD5 digest from browser text input.",
    guide: "Paste text into the input area, then click Generate to create an MD5 hash.",
    longDescription: "Use this MD5 generator to create a one-way hash for text checks, development debugging, and quick checksum comparisons. MD5 is not encryption and cannot be decrypted, so it should not be used for password storage or high-security workflows.",
    useCases: ["Text checksum comparisons", "Development and QA debugging", "Legacy MD5 integrations"],
    steps: ["Paste the text you want to hash.", "Click Generate to create the lowercase MD5 digest.", "Copy the result into your test, script, or documentation."],
    example: { input: "FlowPilot", output: "c6a87374d7406fdac6b5f598a9f26c18" },
    faqs: [
      { question: "Can MD5 be decrypted?", answer: "No. MD5 is a one-way hash, not an encryption format." },
      { question: "Should I use MD5 for password storage?", answer: "No. Use Argon2, bcrypt, or scrypt for password storage." },
      { question: "Does FlowPilot upload my text for MD5 hashing?", answer: "No. The hash is generated in your browser." }
    ],
    relatedToolIds: ["sha1", "sha256", "hash-compare"],
    actions: { primary: "Generate" }
  }),
  t({
    id: "sha1",
    slug: "sha1-generator",
    label: "SHA-1",
    status: "local",
    category: C.hash.name,
    categorySlug: C.hash.slug,
    name: "SHA-1 Generator",
    seoTitle: "Free SHA-1 Hash Generator Online | FlowPilot",
    seoDescription: "Generate SHA-1 hashes for text locally in your browser with no signup and no server upload.",
    h1: "Free SHA-1 Hash Generator Online",
    intro: "Generate a SHA-1 digest from text using the browser Web Crypto API.",
    guide: "Paste text into the input area, then click Generate to create a SHA-1 hash.",
    longDescription: "Create SHA-1 hashes for compatibility checks, legacy integrations, and debugging. SHA-1 is no longer recommended for security-sensitive signatures, but it remains common in older tooling and checksum workflows.",
    useCases: ["Legacy checksum generation", "Git-style debugging references", "Text hash comparison"],
    steps: ["Paste the source text.", "Click Generate to run SHA-1 locally.", "Use the lowercase digest in your comparison or test."],
    example: { input: "FlowPilot", output: "7dcbaf0a6f08f4ec3214cefe46133cb4727b2e83" },
    faqs: faq("SHA-1 generator", "Do not use SHA-1 for new security-sensitive designs."),
    relatedToolIds: ["md5", "sha256", "sha512"],
    actions: { primary: "Generate" }
  }),
  t({
    id: "sha256",
    slug: "sha256-generator",
    label: "SHA-256",
    status: "local",
    category: C.hash.name,
    categorySlug: C.hash.slug,
    name: "SHA-256 Generator",
    seoTitle: "Free SHA-256 Hash Generator Online | FlowPilot",
    seoDescription: "Generate SHA-256 hashes from text directly in your browser using Web Crypto.",
    h1: "Free SHA-256 Hash Generator Online",
    intro: "Generate a SHA-256 digest for text without sending input to a server.",
    guide: "Paste text into the input area, then click Generate to create a SHA-256 hash.",
    longDescription: "Use SHA-256 for modern checksum and digest workflows where a stronger hash than MD5 or SHA-1 is needed. The operation runs locally through Web Crypto and returns a lowercase hexadecimal digest.",
    useCases: ["API signature debugging", "Checksum verification", "Security learning exercises"],
    steps: ["Paste the text to hash.", "Click Generate to calculate the SHA-256 digest.", "Copy the hexadecimal output for your workflow."],
    example: { input: "hello", output: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" },
    faqs: faq("SHA-256 generator", "SHA-256 is a hash, not reversible encryption."),
    relatedToolIds: ["sha1", "sha512", "hash-compare"],
    actions: { primary: "Generate" }
  }),
  t({
    id: "sha512",
    slug: "sha512-generator",
    label: "SHA-512",
    status: "local",
    category: C.hash.name,
    categorySlug: C.hash.slug,
    name: "SHA-512 Generator",
    seoTitle: "Free SHA-512 Hash Generator Online | FlowPilot",
    seoDescription: "Generate SHA-512 hashes from text locally in your browser for checksum and development workflows.",
    h1: "Free SHA-512 Hash Generator Online",
    intro: "Generate long SHA-512 hexadecimal digests from text input.",
    guide: "Paste text into the input area, then click Generate to create a SHA-512 hash.",
    longDescription: "SHA-512 produces a longer digest than SHA-256 and is useful for checksum experiments, hash comparisons, and development tasks that expect a SHA-512 hexadecimal string.",
    useCases: ["Long digest generation", "Checksum testing", "Hash algorithm comparisons"],
    steps: ["Paste text into the input area.", "Click Generate to run SHA-512 in the browser.", "Copy the resulting hexadecimal digest."],
    example: { input: "hello", output: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043" },
    faqs: faq("SHA-512 generator", "The output is deterministic for the same exact input."),
    relatedToolIds: ["sha256", "sha1", "hash-compare"],
    actions: { primary: "Generate" }
  }),
  t({
    id: "hash-compare",
    slug: "hash-compare",
    label: "Compare",
    status: "local",
    category: C.hash.name,
    categorySlug: C.hash.slug,
    name: "Hash Compare Tool",
    seoTitle: "Hash Compare Tool Online | FlowPilot",
    seoDescription: "Compare two hash strings locally in your browser and see whether they match.",
    h1: "Hash Compare Tool Online",
    intro: "Compare two hashes line by line and check whether they are identical.",
    guide: "Paste hash one on the first line and hash two on the second line, then click Compare.",
    longDescription: "Use the hash compare tool to verify whether two generated digests are exactly the same. It trims surrounding whitespace and performs a case-insensitive comparison for common hexadecimal hash workflows.",
    useCases: ["Checksum verification", "Release file hash checks", "Debugging mismatched digests"],
    steps: ["Paste the first hash on line one.", "Paste the second hash on line two.", "Click Compare to see whether they match."],
    example: { input: "abc123\nABC123", output: "Match: the two hashes are identical after trimming and case normalization." },
    faqs: faq("hash compare tool", "It does not generate hashes; it compares two existing values."),
    relatedToolIds: ["md5", "sha256", "sha512"],
    actions: { primary: "Compare" },
    placeholder: "hash1\nhash2"
  }),
  t({
    id: "base64",
    slug: "base64-encoder-decoder",
    label: "Base64",
    status: "local",
    category: C.encoding.name,
    categorySlug: C.encoding.slug,
    name: "Base64 Encoder / Decoder",
    seoTitle: "Base64 Encoder and Decoder Online | FlowPilot",
    seoDescription: "Encode text to Base64 or decode Base64 back to readable UTF-8 text directly in your browser.",
    h1: "Base64 Encoder and Decoder Online",
    intro: "Convert UTF-8 text to Base64 and decode Base64 back to text.",
    guide: "Use Encode to convert text to Base64. Use Decode to convert valid Base64 back to text.",
    longDescription: "Encode plain text into Base64 for API payloads, configuration values, and debugging tasks, or decode Base64 back into readable UTF-8 text. Base64 is an encoding format, not encryption.",
    useCases: ["API payload inspection", "Configuration value conversion", "Text transport debugging"],
    steps: ["Paste text or a Base64 string.", "Click Encode or Decode.", "Review the converted output in the result panel."],
    example: { input: "Hello FlowPilot", output: "SGVsbG8gRmxvd1BpbG90" },
    faqs: [
      { question: "Is Base64 encryption?", answer: "No. Base64 is reversible encoding and should not be used to hide secrets." },
      { question: "Can this decode UTF-8 text?", answer: "Yes. The decoder converts valid Base64 back to UTF-8 text." },
      { question: "When is Base64 useful?", answer: "It is useful when data needs to travel through systems that expect plain characters." }
    ],
    relatedToolIds: ["url-encode", "html-entity", "unicode-converter"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "html-entity",
    slug: "html-entity-encoder-decoder",
    label: "HTML Entity",
    status: "local",
    category: C.encoding.name,
    categorySlug: C.encoding.slug,
    name: "HTML Entity Encoder / Decoder",
    seoTitle: "HTML Entity Encoder and Decoder Online | FlowPilot",
    seoDescription: "Encode special HTML characters into entities or decode HTML entities back to readable text.",
    h1: "HTML Entity Encoder and Decoder Online",
    intro: "Encode and decode common HTML entities for safe markup and debugging.",
    guide: "Click Encode to escape HTML-sensitive characters, or Decode to restore readable text.",
    longDescription: "Convert characters such as angle brackets, ampersands, quotes, and apostrophes into HTML entities. Decode entity strings when inspecting copied markup or cleaning text from web pages.",
    useCases: ["Escaping sample HTML", "Debugging copied markup", "Cleaning encoded text"],
    steps: ["Paste text with HTML-sensitive characters or entities.", "Choose Encode or Decode.", "Copy the safe or readable result."],
    example: { input: "<strong>FlowPilot & tools</strong>", output: "&lt;strong&gt;FlowPilot &amp; tools&lt;/strong&gt;" },
    faqs: faq("HTML entity tool", "It handles common named entities and numeric entities."),
    relatedToolIds: ["url-encode", "unicode-converter", "base64"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "unicode-converter",
    slug: "unicode-converter",
    label: "Unicode",
    status: "local",
    category: C.encoding.name,
    categorySlug: C.encoding.slug,
    name: "Unicode Converter",
    seoTitle: "Unicode Converter Online | FlowPilot",
    seoDescription: "Convert readable text to Unicode escape sequences and decode Unicode escapes back to text.",
    h1: "Unicode Converter Online",
    intro: "Convert text to Unicode escapes and decode Unicode escape sequences.",
    guide: "Click Encode to create Unicode escape sequences, or Decode to restore readable text.",
    longDescription: "Use the Unicode converter when debugging escaped strings in JavaScript, JSON, logs, and configuration files. It converts text to \\uXXXX-style escapes and decodes valid escape sequences back to readable characters.",
    useCases: ["Debugging escaped strings", "Inspecting JSON logs", "Converting non-ASCII text for tests"],
    steps: ["Paste text or Unicode escape sequences.", "Click Encode or Decode.", "Review the readable or escaped output."],
    example: { input: "Flow", output: "\\u0046\\u006c\\u006f\\u0077" },
    faqs: faq("Unicode converter", "Invalid escape sequences are reported as errors."),
    relatedToolIds: ["html-entity", "hex-text", "text-binary"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "hex-text",
    slug: "hex-to-text-converter",
    label: "Hex",
    status: "local",
    category: C.encoding.name,
    categorySlug: C.encoding.slug,
    name: "Hex to Text Converter",
    seoTitle: "Hex to Text Converter Online | FlowPilot",
    seoDescription: "Convert text to hexadecimal values or decode hexadecimal strings back to readable text.",
    h1: "Hex to Text Converter Online",
    intro: "Convert readable text to hex and decode hex back to text.",
    guide: "Click Encode to convert text to hex, or Decode to convert hex back to readable text.",
    longDescription: "Convert UTF-8 text into hexadecimal byte values and decode valid hex strings back into readable text. This is useful for debugging payloads, byte-oriented logs, and low-level text conversions.",
    useCases: ["Payload debugging", "Byte value inspection", "Text encoding experiments"],
    steps: ["Paste text or a hexadecimal string.", "Click Encode or Decode.", "Use the converted output in your debugging workflow."],
    example: { input: "Hi", output: "48 69" },
    faqs: faq("hex converter", "Whitespace in hex input is ignored during decoding."),
    relatedToolIds: ["text-binary", "unicode-converter", "base64"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "text-binary",
    slug: "text-to-binary-converter",
    label: "Binary",
    status: "local",
    category: C.encoding.name,
    categorySlug: C.encoding.slug,
    name: "Text to Binary Converter",
    seoTitle: "Text to Binary Converter Online | FlowPilot",
    seoDescription: "Convert text to binary byte values or decode binary back into readable text.",
    h1: "Text to Binary Converter Online",
    intro: "Convert text to binary and decode binary byte strings back to text.",
    guide: "Click Encode to convert text to binary bytes, or Decode to restore readable text.",
    longDescription: "Turn UTF-8 text into space-separated binary byte values and decode valid binary bytes back into text. The converter is useful for teaching, byte inspection, and debugging simple encoded payloads.",
    useCases: ["Binary learning exercises", "Byte-level debugging", "Encoding demonstrations"],
    steps: ["Paste text or space-separated binary bytes.", "Click Encode or Decode.", "Review the converted text or byte output."],
    example: { input: "A", output: "01000001" },
    faqs: faq("binary converter", "Binary decoding expects 8-bit byte groups."),
    relatedToolIds: ["hex-text", "unicode-converter", "base64"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "aes",
    slug: "aes-encryption-decryption",
    label: "AES",
    status: "local",
    category: C.encryption.name,
    categorySlug: C.encryption.slug,
    name: "AES-GCM Encrypt / Decrypt",
    seoTitle: "AES-GCM Encryption and Decryption Tool | FlowPilot",
    seoDescription: "Encrypt and decrypt text locally in your browser using AES-GCM and a passphrase. No server upload required.",
    h1: "AES-GCM Encryption and Decryption Tool",
    intro: "Encrypt text locally with browser Web Crypto AES-GCM.",
    guide: "Enter text and a passphrase, then click Encrypt. Paste an AES payload and click Decrypt to restore it.",
    longDescription: "Encrypt and decrypt text in your browser with AES-GCM and a passphrase. Keep the passphrase safe because encrypted output cannot be recovered without it. FlowPilot runs the operation locally in supported browsers.",
    useCases: ["Local text encryption tests", "Sharing temporary encrypted notes", "Learning AES-GCM browser workflows"],
    steps: ["Enter the text you want to encrypt or decrypt.", "Provide the passphrase used for the operation.", "Click Encrypt or Decrypt and store the passphrase securely."],
    example: { input: "Secret note + passphrase", output: "AES-GCM payload containing salt, IV, and ciphertext" },
    faqs: [
      { question: "What happens if I lose the passphrase?", answer: "The encrypted payload cannot be restored without the original passphrase." },
      { question: "Does the AES tool upload my text?", answer: "No. The operation uses browser crypto APIs locally." },
      { question: "Which AES mode is used?", answer: "The tool uses AES-GCM with a passphrase-derived key." }
    ],
    relatedToolIds: ["base64", "sha256", "browser-action"],
    actions: { primary: "Encrypt", secondary: "Decrypt" }
  }),
  t({
    id: "json-tools",
    slug: "json-formatter-minifier",
    label: "JSON",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "JSON Formatter and Minifier",
    seoTitle: "JSON Formatter and Minifier Online | FlowPilot",
    seoDescription: "Format messy JSON into readable indentation or minify JSON into a compact single line.",
    h1: "JSON Formatter and Minifier Online",
    intro: "Format messy JSON or minify valid JSON into a compact single line.",
    guide: "Use Format to indent JSON. Use Minify to compress valid JSON into one line.",
    longDescription: "Format JSON with readable indentation for debugging and documentation, or minify valid JSON into a compact single line. Invalid JSON shows a clear parser error so you can fix the source quickly.",
    useCases: ["API response debugging", "Configuration review", "JSON payload minification"],
    steps: ["Paste valid JSON into the input area.", "Click Format to add indentation.", "Click Minify to compact it into one line."],
    example: { input: "{\"tool\":\"FlowPilot\",\"type\":\"json\"}", output: "{\n  \"tool\": \"FlowPilot\",\n  \"type\": \"json\"\n}" },
    faqs: [
      { question: "Will invalid JSON be formatted?", answer: "No. Invalid JSON returns a parser error so you can fix the input." },
      { question: "Does this change JSON values?", answer: "No. Formatting and minifying preserve the parsed data structure." },
      { question: "Is the JSON uploaded?", answer: "No. Formatting runs in the browser." }
    ],
    relatedToolIds: ["json-validator", "json-yaml", "yaml-json"],
    actions: { primary: "Format", secondary: "Minify" }
  }),
  t({
    id: "json-validator",
    slug: "json-validator",
    label: "Validate JSON",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "JSON Validator",
    seoTitle: "JSON Validator Online | FlowPilot",
    seoDescription: "Validate JSON syntax online and format valid JSON directly in your browser.",
    h1: "JSON Validator Online",
    intro: "Validate JSON syntax and display formatted JSON or a clear parser error.",
    guide: "Paste JSON and click Validate to check whether it is valid.",
    longDescription: "The JSON validator parses your input locally, reports syntax errors, and formats valid JSON with readable indentation. It is useful for checking API responses, configuration snippets, and copied payloads.",
    useCases: ["API response validation", "Config file checks", "Debugging copied JSON"],
    steps: ["Paste JSON into the input area.", "Click Validate.", "Read the formatted output or parser error."],
    example: { input: "{\"valid\":true}", output: "Valid JSON\n{\n  \"valid\": true\n}" },
    faqs: faq("JSON validator", "The validator uses JavaScript JSON parsing rules."),
    relatedToolIds: ["json-tools", "json-yaml", "regex-tester"],
    actions: { primary: "Validate" }
  }),
  t({
    id: "json-yaml",
    slug: "json-to-yaml",
    label: "JSON to YAML",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "JSON to YAML Converter",
    seoTitle: "JSON to YAML Converter Online | FlowPilot",
    seoDescription: "Convert valid JSON into YAML format directly in your browser.",
    h1: "JSON to YAML Converter Online",
    intro: "Convert valid JSON objects and arrays into readable YAML.",
    guide: "Paste JSON and click Convert to generate YAML output.",
    longDescription: "Convert JSON payloads into YAML for configuration files, documentation, and developer handoffs. The converter parses JSON first, so invalid input returns a clear error instead of a partial conversion.",
    useCases: ["Config migration", "Documentation examples", "Developer data conversion"],
    steps: ["Paste valid JSON.", "Click Convert.", "Copy the generated YAML."],
    example: { input: "{\"name\":\"FlowPilot\",\"tools\":2}", output: "name: FlowPilot\ntools: 2\n" },
    faqs: faq("JSON to YAML converter", "JSON must be valid before YAML can be generated."),
    relatedToolIds: ["yaml-json", "json-validator", "json-tools"],
    actions: { primary: "Convert" }
  }),
  t({
    id: "yaml-json",
    slug: "yaml-to-json",
    label: "YAML to JSON",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "YAML to JSON Converter",
    seoTitle: "YAML to JSON Converter Online | FlowPilot",
    seoDescription: "Convert YAML into formatted JSON in your browser for configuration and debugging workflows.",
    h1: "YAML to JSON Converter Online",
    intro: "Convert YAML documents into formatted JSON output.",
    guide: "Paste YAML and click Convert to generate JSON.",
    longDescription: "Convert YAML configuration snippets into JSON for APIs, tooling, and debugging. The parser reports invalid YAML clearly so you can correct indentation or syntax issues.",
    useCases: ["Config debugging", "API payload conversion", "YAML syntax checks"],
    steps: ["Paste YAML into the input area.", "Click Convert.", "Review the formatted JSON output."],
    example: { input: "name: FlowPilot\ntools: 2", output: "{\n  \"name\": \"FlowPilot\",\n  \"tools\": 2\n}" },
    faqs: faq("YAML to JSON converter", "Complex YAML features may be simplified into JSON-compatible values."),
    relatedToolIds: ["json-yaml", "json-validator", "json-tools"],
    actions: { primary: "Convert" }
  }),
  t({
    id: "uuid-generator",
    slug: "uuid-generator",
    label: "UUID",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "UUID Generator",
    seoTitle: "UUID Generator Online | FlowPilot",
    seoDescription: "Generate random UUIDs in your browser using crypto.randomUUID().",
    h1: "UUID Generator Online",
    intro: "Generate a random UUID directly in your browser.",
    guide: "Click Generate to create a new UUID. Input text is not required.",
    longDescription: "Generate random UUID values for tests, database seed data, prototypes, and temporary identifiers. The tool uses the browser crypto.randomUUID API when available.",
    useCases: ["Test data generation", "Prototype identifiers", "Database seed values"],
    steps: ["Open the UUID generator.", "Click Generate.", "Copy the UUID from the output panel."],
    example: { input: "(no input required)", output: "550e8400-e29b-41d4-a716-446655440000" },
    faqs: faq("UUID generator", "It generates one UUID each time you click Generate."),
    relatedToolIds: ["timestamp-converter", "json-validator", "slug-generator"],
    actions: { primary: "Generate" },
    requiresInput: false
  }),
  t({
    id: "timestamp-converter",
    slug: "unix-timestamp-converter",
    label: "Timestamp",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "Unix Timestamp Converter",
    seoTitle: "Unix Timestamp Converter Online | FlowPilot",
    seoDescription: "Convert Unix timestamps to ISO dates and ISO date strings back to Unix timestamps in your browser.",
    h1: "Unix Timestamp Converter Online",
    intro: "Convert Unix seconds and ISO date strings in both directions.",
    guide: "Enter a Unix timestamp or ISO date, then click Convert. Empty input returns the current time.",
    longDescription: "Convert Unix timestamps in seconds or milliseconds into ISO dates, and convert ISO-style date strings back into Unix seconds and milliseconds. Empty input shows the current browser time.",
    useCases: ["Log debugging", "API timestamp checks", "Time zone inspection"],
    steps: ["Paste a Unix timestamp or ISO date string.", "Click Convert.", "Review both ISO and Unix outputs."],
    example: { input: "1704067200", output: "ISO: 2024-01-01T00:00:00.000Z\nUnix seconds: 1704067200" },
    faqs: faq("timestamp converter", "Numeric input with 13 digits is treated as milliseconds."),
    relatedToolIds: ["uuid-generator", "json-validator", "regex-tester"],
    actions: { primary: "Convert" },
    requiresInput: false
  }),
  t({
    id: "regex-tester",
    slug: "regex-tester",
    label: "Regex",
    status: "local",
    category: C.developer.name,
    categorySlug: C.developer.slug,
    name: "Regex Tester",
    seoTitle: "Regex Tester Online | FlowPilot",
    seoDescription: "Test JavaScript regular expressions against sample text and inspect matches in your browser.",
    h1: "Regex Tester Online",
    intro: "Test a JavaScript regular expression against sample text.",
    guide: "Put /pattern/flags on the first line and test text below it, then click Test.",
    longDescription: "Use the regex tester to quickly check JavaScript regular expressions against pasted text. It lists match count, matched values, indexes, and capture groups when available.",
    useCases: ["Pattern debugging", "Log parsing tests", "Form validation experiments"],
    steps: ["Enter /pattern/flags on line one.", "Paste test text on later lines.", "Click Test to inspect matches."],
    example: { input: "/flow\\w+/gi\nFlowPilot flowtools", output: "2 matches\n1. FlowPilot at index 0\n2. flowtools at index 10" },
    faqs: faq("regex tester", "It follows JavaScript RegExp behavior."),
    relatedToolIds: ["json-validator", "word-counter", "case-converter"],
    actions: { primary: "Test" },
    placeholder: "/pattern/flags\ntest text"
  }),
  t({
    id: "morse",
    slug: "morse-code-translator",
    label: "Morse",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Morse Code Translator",
    seoTitle: "Morse Code Translator Online | FlowPilot",
    seoDescription: "Translate English letters, numbers, and common symbols to Morse code and decode Morse code back to text.",
    h1: "Morse Code Translator Online",
    intro: "Translate English text and numbers to Morse code.",
    guide: "Use Encode to translate text to Morse. Use Decode to translate Morse back to text.",
    longDescription: "Translate English letters, numbers, and common symbols into Morse code, or decode Morse code back into readable text. It is useful for learning, experiments, and playful text conversion.",
    useCases: ["Learning Morse code", "Classroom or hobby experiments", "Converting short text messages"],
    steps: ["Paste English text or Morse code.", "Click Encode or Decode.", "Use spaces and slash separators for clearer Morse input."],
    example: { input: "SOS", output: "... --- ..." },
    faqs: [
      { question: "Which characters are supported?", answer: "The tool supports English letters, numbers, and common punctuation symbols." },
      { question: "Can Morse code be decoded back to text?", answer: "Yes, if the dots, dashes, spaces, and separators are valid." },
      { question: "Is this intended for radio transmission?", answer: "It is designed as a text translator and learning utility." }
    ],
    relatedToolIds: ["case-converter", "word-counter", "text-binary"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "word-counter",
    slug: "word-counter",
    label: "Words",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Word Counter",
    seoTitle: "Word Counter Online | FlowPilot",
    seoDescription: "Count words, characters, spaces, and lines in text directly in your browser.",
    h1: "Word Counter Online",
    intro: "Count words, characters, spaces, and lines in pasted text.",
    guide: "Paste text and click Count to calculate writing and editing metrics.",
    longDescription: "Use the word counter to measure article drafts, page copy, metadata, support replies, and content briefs. It reports word count, character count, non-space characters, spaces, and line count.",
    useCases: ["SEO copy checks", "Content editing", "Support response length checks"],
    steps: ["Paste the text you want to measure.", "Click Count.", "Review word, character, space, and line totals."],
    example: { input: "FlowPilot tools\ncount words.", output: "Words: 4\nCharacters: 28\nCharacters excluding spaces: 25\nSpaces: 3\nLines: 2" },
    faqs: faq("word counter", "Words are split on whitespace after trimming."),
    relatedToolIds: ["character-counter", "case-converter", "sort-lines"],
    actions: { primary: "Count" }
  }),
  t({
    id: "character-counter",
    slug: "character-counter",
    label: "Characters",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Character Counter",
    seoTitle: "Character Counter Online | FlowPilot",
    seoDescription: "Count characters, spaces, and lines in text locally in your browser.",
    h1: "Character Counter Online",
    intro: "Count characters with and without spaces, plus line totals.",
    guide: "Paste text and click Count to measure character length.",
    longDescription: "Measure character length for titles, descriptions, social posts, snippets, and form fields. The output separates total characters from non-space characters and line counts.",
    useCases: ["Meta description length checks", "Form field limits", "Social post drafting"],
    steps: ["Paste text into the input area.", "Click Count.", "Use the totals to adjust length."],
    example: { input: "Flow Pilot", output: "Characters: 10\nCharacters excluding spaces: 9\nSpaces: 1\nLines: 1" },
    faqs: faq("character counter", "It counts JavaScript string characters, including punctuation and spaces."),
    relatedToolIds: ["word-counter", "slug-generator", "case-converter"],
    actions: { primary: "Count" }
  }),
  t({
    id: "slug-generator",
    slug: "slug-generator",
    label: "Slug",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Slug Generator",
    seoTitle: "Slug Generator Online | FlowPilot",
    seoDescription: "Convert titles and text into clean URL slugs in your browser.",
    h1: "Slug Generator Online",
    intro: "Turn titles, headings, and phrases into lowercase URL slugs.",
    guide: "Paste a title and click Generate to create a URL-friendly slug.",
    longDescription: "Create clean URL slugs for blog posts, documentation pages, product pages, and internal tools. The generator lowercases text, removes unsafe characters, and joins words with hyphens.",
    useCases: ["Blog post URLs", "Documentation page slugs", "Product page handles"],
    steps: ["Paste a title or phrase.", "Click Generate.", "Copy the lowercase hyphenated slug."],
    example: { input: "Free Online Tools for Developers!", output: "free-online-tools-for-developers" },
    faqs: faq("slug generator", "The output is designed for readable URL paths."),
    relatedToolIds: ["case-converter", "url-encode", "word-counter"],
    actions: { primary: "Generate" }
  }),
  t({
    id: "case-converter",
    slug: "case-converter",
    label: "Case",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Case Converter",
    seoTitle: "Case Converter Online | FlowPilot",
    seoDescription: "Convert text to lower case, upper case, title case, camelCase, kebab-case, and snake_case.",
    h1: "Case Converter Online",
    intro: "Convert text into common writing and code casing styles.",
    guide: "Paste text and click Convert to generate several case variants.",
    longDescription: "Convert names, labels, headings, and identifiers into lower case, upper case, title case, camelCase, kebab-case, and snake_case. It is useful for content cleanup and developer naming tasks.",
    useCases: ["Identifier cleanup", "Heading conversion", "Code naming experiments"],
    steps: ["Paste text into the input area.", "Click Convert.", "Choose the case variant you need."],
    example: { input: "flow pilot tools", output: "lower case: flow pilot tools\nUPPER CASE: FLOW PILOT TOOLS\nTitle Case: Flow Pilot Tools\ncamelCase: flowPilotTools\nkebab-case: flow-pilot-tools\nsnake_case: flow_pilot_tools" },
    faqs: faq("case converter", "Separators and punctuation are normalized for code-style outputs."),
    relatedToolIds: ["slug-generator", "word-counter", "remove-duplicate-lines"],
    actions: { primary: "Convert" }
  }),
  t({
    id: "remove-duplicate-lines",
    slug: "remove-duplicate-lines",
    label: "Deduplicate",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Remove Duplicate Lines",
    seoTitle: "Remove Duplicate Lines Online | FlowPilot",
    seoDescription: "Remove duplicate lines from text while preserving the first occurrence order.",
    h1: "Remove Duplicate Lines Online",
    intro: "Deduplicate lines while keeping the first occurrence order.",
    guide: "Paste line-based text and click Process to remove repeated lines.",
    longDescription: "Clean lists, logs, keywords, URLs, and copied data by removing duplicate lines. The first occurrence of each unique line is preserved so the original order remains predictable.",
    useCases: ["Keyword list cleanup", "URL list deduplication", "Log and CSV preparation"],
    steps: ["Paste one item per line.", "Click Process.", "Copy the deduplicated output."],
    example: { input: "alpha\nbeta\nalpha", output: "alpha\nbeta" },
    faqs: faq("duplicate line remover", "Empty lines are treated as lines and deduplicated too."),
    relatedToolIds: ["sort-lines", "word-counter", "case-converter"],
    actions: { primary: "Process" }
  }),
  t({
    id: "sort-lines",
    slug: "sort-lines",
    label: "Sort",
    status: "local",
    category: C.text.name,
    categorySlug: C.text.slug,
    name: "Sort Lines",
    seoTitle: "Sort Lines Online | FlowPilot",
    seoDescription: "Sort lines of text alphabetically in ascending order directly in your browser.",
    h1: "Sort Lines Online",
    intro: "Sort line-based text alphabetically in ascending order.",
    guide: "Paste lines and click Sort to order them alphabetically.",
    longDescription: "Sort lists, keywords, URLs, notes, or short datasets in ascending alphabetical order. The tool keeps one item per line and runs locally in your browser.",
    useCases: ["Keyword sorting", "List cleanup", "Small text dataset organization"],
    steps: ["Paste one item per line.", "Click Sort.", "Copy the sorted output."],
    example: { input: "zebra\napple\nmango", output: "apple\nmango\nzebra" },
    faqs: faq("sort lines tool", "Sorting uses locale-aware string comparison."),
    relatedToolIds: ["remove-duplicate-lines", "word-counter", "slug-generator"],
    actions: { primary: "Sort" }
  }),
  t({
    id: "url-encode",
    slug: "url-encoder-decoder",
    label: "URL Encode",
    status: "local",
    category: C.web.name,
    categorySlug: C.web.slug,
    name: "URL Encode / Decode",
    seoTitle: "URL Encoder and Decoder Online | FlowPilot",
    seoDescription: "Encode URLs and query strings safely, or decode percent-encoded text back to readable format.",
    h1: "URL Encoder and Decoder Online",
    intro: "Encode URLs, query strings, and special characters for safe transport.",
    guide: "Use Encode to URL-encode text. Use Decode to decode percent-encoded strings.",
    longDescription: "Encode URL parameters and query strings with browser-safe percent encoding, or decode encoded text back into readable form. This is useful when debugging APIs, links, and tracking parameters.",
    useCases: ["Query string debugging", "API parameter preparation", "Percent-encoded text inspection"],
    steps: ["Paste a URL segment, query value, or encoded string.", "Click Encode for URL-safe escaping.", "Click Decode to read percent-encoded text."],
    example: { input: "name=Flow Pilot&topic=url tools", output: "name%3DFlow%20Pilot%26topic%3Durl%20tools" },
    faqs: [
      { question: "What browser API does this use?", answer: "The tool uses encodeURIComponent and decodeURIComponent style conversion." },
      { question: "Should I encode an entire URL or a parameter value?", answer: "Usually you should encode individual parameter values, not the full URL including separators." },
      { question: "Can it decode malformed input?", answer: "Malformed percent-encoded input may return an error so you can correct it." }
    ],
    relatedToolIds: ["html-entity", "base64", "slug-generator"],
    actions: { primary: "Encode", secondary: "Decode" }
  }),
  t({
    id: "browser-action",
    slug: "browser-actions",
    label: "Browser",
    status: "local",
    category: C.web.name,
    categorySlug: C.web.slug,
    name: "Browser Clipboard and Text Download Tools",
    seoTitle: "Browser Clipboard and Text Download Tools | FlowPilot",
    seoDescription: "Copy text to your clipboard or download text as a local file using simple browser-based actions.",
    h1: "Browser Clipboard and Text Download Tools",
    intro: "Copy text to your clipboard or download text as a local file.",
    guide: "Use Copy to copy input to your clipboard. Use Download to save input as a text file.",
    longDescription: "Use browser-based actions to copy text to the clipboard or download text as a local file. These actions run in the browser and are useful for quick handoffs between tools.",
    useCases: ["Copying transformed text", "Downloading quick text exports", "Testing browser clipboard permissions"],
    steps: ["Paste the text you want to copy or save.", "Click Copy to write text to your clipboard.", "Click Download to save the text as a local file."],
    example: { input: "Text to save", output: "Copied to clipboard or downloaded as flowpilot-export.txt" },
    faqs: [
      { question: "Why did clipboard copy fail?", answer: "Some browsers require permission or a secure context before clipboard writing is allowed." },
      { question: "Where is the text file saved?", answer: "The browser downloads it using your normal download settings." },
      { question: "Does this need a server?", answer: "No. Copy and download actions run in the browser." }
    ],
    relatedToolIds: ["json-tools", "aes", "url-encode"],
    actions: { primary: "Copy", secondary: "Download" }
  })
];

export const defaultToolId = toolsRegistry[0]?.id ?? "md5";

export const toolsById = Object.fromEntries(toolsRegistry.map((tool) => [tool.id, tool])) as Record<
  string,
  ToolDefinition
>;

export const toolsBySlug = Object.fromEntries(toolsRegistry.map((tool) => [tool.slug, tool])) as Record<
  string,
  ToolDefinition
>;

export const toolCategories = toolCategoryDefinitions.map((category) => ({
  ...category,
  tools: toolsRegistry.filter((tool) => tool.categorySlug === category.slug)
}));

export const categoriesBySlug = Object.fromEntries(toolCategories.map((category) => [category.slug, category])) as Record<
  string,
  ToolCategoryDefinition & { tools: ToolDefinition[] }
>;

export const getToolPath = (tool: Pick<ToolDefinition, "slug">) => `/tools/${tool.slug}`;

export const getCategoryPath = (categoryOrSlug: Pick<ToolCategoryDefinition, "slug"> | string) =>
  `/tools/${typeof categoryOrSlug === "string" ? categoryOrSlug : categoryOrSlug.slug}`;

export const getRelatedTools = (tool: ToolDefinition) =>
  tool.relatedToolIds.map((id) => toolsById[id]).filter(Boolean);
