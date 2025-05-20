module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    'subject-case': [0],
    
    // prefix 검증
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "design",
        "refactor",
        "style",
        "docs",
        "test",
        "chore",
        "rename",
        "remove"
      ]
    ]
  }
};