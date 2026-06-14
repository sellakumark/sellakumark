import { RuleConfigSeverity } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style"
      ]
    ]
  }
}
