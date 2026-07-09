import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "dist/",
      ".turbo/",
      ".swc/",
      "public/",
      "*.config.js",
      "*.config.ts",
      "next-env.d.ts",
      ".vscode/",
      ".idea/",
      "tsconfig.tsbuildinfo"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
];

export default eslintConfig;
