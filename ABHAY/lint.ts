import { ESLint } from "./deps.ts";
import customRules from "./customRules.ts";
console.log("Starting ESLint...");
const eslintCli = new ESLint({
    useEslintrc: false,
    overrideConfig: {
        parserOptions: { ecmaVersion: 2021, sourceType: "module" },
        plugins: ["custom-rules"],
        // extends: ["eslint:recommended"],
        rules: {
            // "custom-rules/function-name-capitalization": "error",
            // "custom-rules/small-function-name": "error",
            "custom-rules/expensive-loop": "error",
        },
    },
    plugins: { "custom-rules": customRules },
});
console.log("ESLint instance created, searching for files...");
const results = await eslintCli.lintFiles(["src/**/*.ts"]);
console.log(`Found ${results.length} file(s) to lint.`);
const formatter = await eslintCli.loadFormatter("stylish");
const resultText = formatter.format(results);
console.log(resultText);
if (results.some((result) => result.errorCount > 0)) Deno.exit(1);
