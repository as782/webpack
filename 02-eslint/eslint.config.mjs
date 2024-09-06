import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": 1,
      "no-var": 2,
      "no-unused-vars": 2,
      "no-undef": 0,
    }
  }
];