const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
    entry: {
        app: ["@babel/polyfill", "./src/index.tsx"],
    },
    output: {
        filename: argv.mode === "production" ? "[name].[chunkhash].js" : "[name].js",
        chunkFilename: argv.mode === "production" ? "chunks/[name].[chunkhash].js" : "chunks/[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: `/`,
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "classnames-loader",
                    argv.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
                    { loader: "css-loader", options: { modules: true } },
                    "less-loader",
                ],
                include: /src/,
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/i,
                include: /react-(ui|icons)/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { modules: "global" },
                    },
                ],
            },
            {
                test: /\.(img|png|jpe?g|gif|svg|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    devtool: argv.mode === "production" ? false : "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    devServer: {
        historyApiFallback: true,
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: argv.mode === "production" ? "[name].[contenthash].css" : "[name].css",
        }),
    ],
});
