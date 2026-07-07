export type AppEnv = {
  Bindings: {
    COSMOS_KV?: KVNamespace;
    DB?: D1Database;
    BUCKET?: R2Bucket;
    AI_API_KEY?: string;
  };
};

export type ModuleStatus = "planned" | "stub" | "active";

export type AppModule = {
  id: string;
  name: string;
  category: string;
  status: ModuleStatus;
  apiBase: string;
};
