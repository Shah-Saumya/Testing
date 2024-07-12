export default {
    rules: {
        "function-name-capitalization": {
            meta: {
                type: "problem",
                docs: {
                    description:
                        "Enforce function names to start with a capital letter",
                    category: "Stylistic Issues",
                    recommended: false,
                },
                fixable: null,
                schema: [],
            },
            create: function (context) {
                return {
                    FunctionDeclaration(node) {
                        if (
                            node.id && node.id.name &&
                            !/^[A-Z]/.test(node.id.name)
                        ) {
                            context.report({
                                node: node.id,
                                message:
                                    "Function name must start with a capital letter.",
                            });
                        }
                    },
                };
            },
        },
        "small-function-name": {
            meta: {
                type: "problem",
                docs: {
                    description:
                        "Enforce function names to be less than 10 characters",
                    category: "Stylistic Issues",
                    recommended: false,
                },
                fixable: null,
                schema: [],
            },
            create: function (context) {
                return {
                    FunctionDeclaration(node) {
                        if (
                            node.id && node.id.name && node.id.name.length >= 10
                        ) {
                            context.report({
                                node: node.id,
                                message:
                                    "Function name must be less than 10 characters.",
                            });
                        }
                    },
                };
            },
        },
        "expensive-loop": {
            meta: {
                type: "suggestion",
                docs: {
                    description: "Detect potentially expensive loop operations, including very large iteration counts",
                    category: "Performance",
                    recommended: false,
                },
                fixable: null,
                schema: [],
            },
            create: function (context) {
                function containsNestedLoop(body) {
                    let containsLoop = false;
                    body.forEach((statement) => {
                        if (
                            statement.type === "ForStatement" ||
                            statement.type === "WhileStatement" ||
                            statement.type === "DoWhileStatement"
                        ) {
                            containsLoop = true;
                        }
                    });
                    return containsLoop;
                }

                function containsExpensiveOperation(body) {
                    let containsExpensive = false;
                    body.forEach((statement) => {
                        if (
                            statement.type === "ExpressionStatement" &&
                            statement.expression &&
                            (
                                statement.expression.type ===
                                    "CallExpression" ||
                                statement.expression.type ===
                                    "NewExpression"
                            )
                        ) {
                            // You may further check for specific methods like sort, reduce, etc.
                            containsExpensive = true;
                        }
                    });
                    return containsExpensive;
                }

                function hasLargeIterationCount(node) {
                    if (node.type !== "ForStatement") return false;

                    if (
                        node.test &&
                        node.test.type === "BinaryExpression" &&
                        node.test.right &&
                        node.test.right.type === "Literal" &&
                        typeof node.test.right.value === "number" &&
                        node.test.right.value >= 1e9
                    ) {
                        return true;
                    }

                    return false;
                }
                function isExpensiveLoop(node) {
                    if (
                        containsNestedLoop(node.body.body) ||
                        containsExpensiveOperation(node.body.body) ||
                        hasLargeIterationCount(node)
                    ) {
                        return true;
                    }
                    return false;
                }

                return {
                    ForStatement(node) {
                        if (isExpensiveLoop(node)) {
                            context.report({
                                node: node,
                                message: "Potentially expensive loop detected.",
                            });
                        }
                    },
                    WhileStatement(node) {
                        if (isExpensiveLoop(node)) {
                            context.report({
                                node: node,
                                message: "Potentially expensive loop detected.",
                            });
                        }
                    },
                    DoWhileStatement(node) {
                        if (isExpensiveLoop(node)) {
                            context.report({
                                node: node,
                                message: "Potentially expensive loop detected.",
                            });
                        }
                    },
                };
            },
        },
        'no-long-functions': {
            create(context) {
                return {
                    FunctionDeclaration(node) {
                        const lines = node.loc.end.line - node.loc.start.line + 1;
                        if (lines > 10) {
                            context.report({
                                node: node,
                                message: "Function has more than 10 lines of code.",
                            });
                        }
                    },
                    FunctionExpression(node) {
                        const lines = node.loc.end.line - node.loc.start.line + 1;
                        if (lines > 10) {
                            context.report({
                                node: node,
                                message: "Function has more than 10 lines of code.",
                            });
                        }
                    },
                    ArrowFunctionExpression(node) {
                        const lines = node.loc.end.line - node.loc.start.line + 1;
                        if (lines > 10) {
                            context.report({
                                node: node,
                                message: "Function has more than 10 lines of code.",
                            });
                        }
                    },
                };
            },
        },
        "test-file-location": {
            meta: {
                type: "problem",
                docs: {
                    description: "Ensure .test.ts files are in the /tests folder",
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
                        if (filename.endsWith(".test.ts") && !filename.includes("/tests/")) {
                            context.report({
                                node,
                                message: ".test.ts file should be in the /tests folder.",
                            });
                        }
                    },
                };
            },
        },

    },
};
