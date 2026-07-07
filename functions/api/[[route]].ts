import app from "../../serve/app";
import type { AppEnv } from "../../serve/types";

export const onRequest: PagesFunction<AppEnv["Bindings"]> = (context) => {
  return app.fetch(context.request, context.env);
};
