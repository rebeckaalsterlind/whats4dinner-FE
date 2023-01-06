export default {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-vars": ["error", {"args": "all", "argsIgnorePattern": "^_"}],
      "@typescript-eslint/comma-dangle": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": "error",
      "function-paren-newline": "off",
      "import/no-cycle": "error",
      "no-console": ["warn", { "allow": ["warn", "error", "time", "timeEnd", "info"] }],
      "max-len": ["error", { "code": 180 }],
      "@typescript-eslint/no-use-before-define": "off",
      "useUnknownInCatchVariables": "off",
      "import/prefer-default-export": "off",
      "import/no-unresolved": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "import/default": "off",
      "no-shadow": ["off"],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "import/named": "error",
      "vue/multi-word-component-names": false,
      "indent": ["error", 2, { "SwitchCase": 1 }]
  }
}
