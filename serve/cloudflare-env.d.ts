type KVNamespace = {
  get(key: string): Promise<string | null>;
  get<T = unknown>(key: string, type: "json"): Promise<T | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

type D1Database = {
  prepare(query: string): unknown;
};

type R2Bucket = {
  get(key: string): Promise<unknown>;
  put(key: string, value: ReadableStream | ArrayBuffer | string): Promise<unknown>;
};

type PagesFunction<Env = Record<string, unknown>> = (context: {
  request: Request;
  env: Env;
  waitUntil?: (promise: Promise<unknown>) => void;
  passThroughOnException?: () => void;
}) => Response | Promise<Response>;
