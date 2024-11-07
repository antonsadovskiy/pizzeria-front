import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin"; // Подключаем плагин TypeScript
import typescriptParser from "@typescript-eslint/parser"; // Подключаем парсер TypeScript
import prettier from "eslint-plugin-prettier"; // Подключаем плагин Prettier

export default [
    {
        ignores: ["dist"],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: typescriptParser, // Указываем парсер для TypeScript
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            react,
            "@typescript-eslint": typescriptEslint, // Убедитесь, что плагин TypeScript добавлен корректно
            prettier, // Подключаем плагин Prettier
        },
        settings: {
            'import/resolver': {
                alias: {
                    map: [['@', './src']],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "object-curly-spacing": ["error", "always"],
            "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
        },
    },
    js.configs.recommended, // Добавляем рекомендуемые настройки ESLint
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
        },
    },
    {
        plugins: {
            react: react,
        },
        rules: {
            ...react.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "prettier/prettier": "error",
        },
    },
];
