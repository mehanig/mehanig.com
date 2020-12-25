module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react'],
    rules: {
        'no-var': 2,
        curly: 2,
        'no-console': 2,
        'react/jsx-no-bind': 2,
    },
};
