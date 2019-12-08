require("dotenv").config();
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" }, useBuiltIns: "usage", corejs: 3 },
              ],
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              ["@babel/plugin-proposal-optional-chaining", { loose: true }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: true }],
              // // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              // ["@babel/plugin-proposal-decorators", { legacy: true }],
              // ["@babel/plugin-proposal-class-properties", { loose: true }],
              "react-hot-loader/babel",
            ],
          },
        },
      },
      {
        test: /\.(css)/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/graphql": {
        target: process.env.PROXY_API,
      },
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV", "API", "API_KEY"]),
    new HtmlWebpackPlugin({ template: "./src/index.html.ejs" }),
  ],
};
