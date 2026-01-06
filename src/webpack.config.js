const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const CopyPlugin = require("copy-webpack-plugin");


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appSrc = resolveApp("src");
const appPackageJson = resolveApp("package.json");
const appTsIndex = resolveApp("src/index.tsx");
const appAboutIndex = resolveApp("src/about.tsx");
const appTsConfigJson = resolveApp("tsconfig.json");
const appNodeModules = resolveApp("node_modules");


module.exports = {
    entry: {
        'index': appTsIndex,
        'about': appAboutIndex
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        modules: ["node_modules", appNodeModules],
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
        plugins: [
            // new ModuleScopePlugin(appSrc, [appPackageJson]),
            new TsconfigPathsPlugin({
                configFile: appTsConfigJson,
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: "pre",
                use: [
                    {
                        loader: "eslint-loader",
                        options: {
                            fix: false,
                            emitWarning: true,
                            failOnWarning: true,
                            configFile: "src/.eslintrc.js",
                        },
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: { babelrc: true },
                    },
                ],
            },
            {
                test: /\.js$/,
                include: /node_modules\/@paper-design/,
                resolve: {
                    fullySpecified: false,
                },
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                ["@babel/plugin-transform-runtime", { regenerator: true }],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" }, // translates CSS into CommonJS
                ],
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works just like "file" loader but it also embeds
                    // assets smaller than specified size as data URLs to avoid requests.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name: "static/[folder]/[name].[ext]",
                        },
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: appSrc,
                        loader: require.resolve("babel-loader"),
                        options: {
                            compact: true,
                        },
                    },
                    // ** STOP ** Are you adding a new loader?
                    // Make sure to add the new loader(s) before the "file" loader.
                ],
            },
            {
                loader: require.resolve("file-loader"),
                // Exclude `js` files to keep "css" loader working as it injects
                // it's runtime that would otherwise processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [
                    /\.(js|jsx|mjs|ts|tsx)$/,
                    /\.html$/,
                    /\.json$/,
                    /\.scss$/,
                    /\.css$/,
                ],
                options: {
                    name: "static/[folder]/[name].[ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({filename: 'about.html',template: './src/about.html', chunks: ["about"]}),
        new CopyPlugin({
            patterns: [
                {
                    from: "*.js",
                    to: "static/libs/",
                    context: "src/static/libs/"
                },
                {
                    from: "*.*",
                    to: "static/images/",
                    context: "src/static/images/"
                },
            ],
        }),
    ],

};