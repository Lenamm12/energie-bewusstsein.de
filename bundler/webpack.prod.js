const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
    ],
  },
});
