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


module.exports = {
  "env": {
    "browser": true,  // 适用于浏览器环境
    "es2021": true    // 支持 ES2021 及其特性
  },
  "parserOptions": {
    "ecmaVersion": 12,  // ES2021 语法版本（可以根据需要设置为 6, 8, 12 等）
    "sourceType": "module"  // 使用 ES Module 语法
  },

  rules: {
    semi: "error", // 强制在语句末尾使用分号

    "no-console": 1, // 禁止使用console
    "no-var": 2, // 禁止使用var
    "no-unused-vars": 2, // 禁止出现未使用的变量
    "no-undef": 2, // 允许出现未定义的变量
  }
}
