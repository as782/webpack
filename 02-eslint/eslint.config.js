// import globals from "globals";
// import pluginJs from "@eslint/js";


// export default [
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   {
//     rules: {
//       "no-console": 1,
//       "no-var": 2,
//       "no-unused-vars": 2,
//       "no-undef": 0,
//     }
//   }
// ];


const globals = require("globals");

module.exports = [{
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
    }

  },
  ignores:['dist/**/*','**.config.js'], // 忽略dist目录,忽略**.config.js
  rules: {
    "semi": 'error',
    'no-console': 'warn',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'no-undef': 'error'
  }
}
]

