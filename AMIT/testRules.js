export default {
    rules: {
        "test-file-extension": {
            meta: {
                type: "problem",
                docs: {
                    description: "Ensure test files have a .test.ts extension",
                    category: "Best Practices",
                    recommended: false,
                },
                fixable: null,
                schema: [],
            },
            create: function (context) {
                return {
                    Program(node) {
                        const filename = context.getFilename();
                        if (!filename.endsWith(".test.ts")) {
                            context.report({
                                node,
                                message: "Test file should have a .test.ts extension.",
                            });
                        }
                    },
                };
            },
        },
        "test-directory": {
            meta: {
                type: "problem",
                docs: {
                    description: "Ensure test files are in the tests directory",
                    category: "Best Practices",
                    recommended: false,
                },
                fixable: null,
                schema: [],
            },
            create: function (context) {
                return {
                    Program(node) {
                        const filename = context.getFilename();
                        if (!filename.includes("/tests/")) {
                            context.report({
                                node,
                                message: "Test file should be in the tests directory.",
                            });
                        }
                    },
                };
            },
        },
    
    },
};