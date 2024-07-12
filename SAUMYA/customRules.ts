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
        "assertion-library-consistent-import": {}
    },
};
