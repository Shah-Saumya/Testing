import { ESLint } from "./deps.ts";
import customRules from "./customRules.ts";

console.log("Starting ESLint...");

const eslintCli = new ESLint({
    useEslintrc: false,
    overrideConfig: {
        parser: "@typescript-eslint/parser", // Use TypeScript parser
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: ["@typescript-eslint", "custom-rules"],
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended" // Use @typescript-eslint recommended rules
        ],
        rules: {
            "@typescript-eslint/no-unused-vars": "warn", // Example rule from @typescript-eslint
            "custom-rules/function-name-capitalization": "error",
            "custom-rules/small-function-name": "error",
            // "custom-rules/expensive-loop": "error",
        },
    },
    plugins: {
        "custom-rules": customRules
    },
});

console.log("ESLint instance created, searching for files...");

(async () => {
const results = await eslintCli.lintFiles(["src/**/*.ts"]);
console.log(`Found ${results.length} file(s) to lint.`);

const formatter = await eslintCli.loadFormatter("stylish");
const resultText = formatter.format(results);
console.log(resultText);

if (results.some((result) => result.errorCount > 0)) Deno.exit(1);
})();
