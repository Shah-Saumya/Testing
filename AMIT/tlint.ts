import { ESLint } from "./deps.ts";
import testRules from "./testRules.js";
console.log("Starting ESLint for test files...");
const eslintCli = new ESLint({
    useEslintrc: false,
    overrideConfig: {
        parserOptions: { ecmaVersion: 2021, sourceType: "module" },
        plugins: ["test-rules"],
        rules: {
            "test-rules/test-file-extension": "error",
            "test-rules/test-directory": "error",
        },
    },
    plugins: { "test-rules": testRules },
});
console.log("ESLint instance created, searching for test files...");
const results = await eslintCli.lintFiles(["tests/**/*"]);
console.log(`Found ${results.length} test file(s) to lint.`);
const formatter = await eslintCli.loadFormatter("stylish");
const resultText = formatter.format(results);
console.log(resultText);
if (results.some((result) => result.errorCount > 0)) {
    Deno.exit(1);
} else {
    console.log("Your test files are ready to deploy.");
}
//Starting Meetups for AI Awareness in Our Company.