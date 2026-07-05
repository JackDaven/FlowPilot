import type { AppModule } from "./types";

export const modules: AppModule[] = [
  {
    id: "ai-gallery",
    name: "AI Beauty",
    category: "ai",
    status: "planned",
    apiBase: "/api/ai/gallery"
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    category: "ai",
    status: "planned",
    apiBase: "/api/ai/tools"
  },
  {
    id: "ai-generation",
    name: "AI Generation",
    category: "ai",
    status: "planned",
    apiBase: "/api/ai/generate"
  },
  {
    id: "news",
    name: "News",
    category: "content",
    status: "planned",
    apiBase: "/api/news"
  },
  {
    id: "utility-tools",
    name: "Utility Tools",
    category: "tools",
    status: "planned",
    apiBase: "/api/tools"
  },
  {
    id: "video-parser",
    name: "Video Parser",
    category: "tools",
    status: "planned",
    apiBase: "/api/video"
  },
  {
    id: "dashboard",
    name: "Dashboard",
    category: "admin",
    status: "planned",
    apiBase: "/api/dashboard"
  }
];
