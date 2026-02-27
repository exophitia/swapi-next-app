import { fixupConfigRules } from "@eslint/compat";
import nextConfig from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

const config = [...fixupConfigRules(nextConfig), prettierConfig];
export default config;
