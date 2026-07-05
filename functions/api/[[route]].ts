import app from "../../src/server/app";
import type { AppEnv } from "../../src/server/types";

export const onRequest: PagesFunction<AppEnv["Bindings"]> = (context) => {
  return app.fetch(context.request, context.env);
};
