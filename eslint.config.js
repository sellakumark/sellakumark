// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierConfig = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic, angular.configs.tsRecommended, prettierConfig],
    processor: angular.processInlineTemplates,
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "sk",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "sk",
          style: "kebab-case"
        }
      ],
      "prettier/prettier": [
        "error",
        {
          parser: "typescript",
          bracketSameLine: true,
          endOfLine: "auto",
          printWidth: 320,
          proseWrap: "never",
          singleQuote: true,
          trailingComma: "none"
        }
      ]
    }
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": ["error", { parser: "angular" }],
      "@angular-eslint/template/elements-content": "off"
    }
  }
]);
