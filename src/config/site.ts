export const siteConfig = {
  name: "FlowPilot",
  url: "https://flowpilot.dev",
  description: "Free browser-based tools for creators, developers, and marketers.",
  defaultTitle: "FlowPilot - Free Online Tools for Creators and Developers",
  defaultDescription: "Free browser-based tools for hashing, encoding, encryption, formatting, and text conversion.",
  analytics: {
    enabledEnv: "PUBLIC_ANALYTICS_ENABLED",
    providerEnv: "PUBLIC_ANALYTICS_PROVIDER"
  }
};

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
