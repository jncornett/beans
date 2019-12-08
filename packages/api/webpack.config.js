const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  externals: [nodeExternals()],
  target: "node",
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
              ["@babel/preset-env", { targets: { node: "12" } }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new Dotenv({ defaults: true }),
  ],
};
