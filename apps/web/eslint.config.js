import { nextJsConfig } from "@repo/eslint-config/next-js";
import { defineConfig } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  ...nextJsConfig,
  {
    ignores: ["./app/**/_mock.ts", "./app/**/data.d.ts"],
  }
]);
