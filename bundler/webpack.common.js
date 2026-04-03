const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        type: "asset/source",
        exclude: path.resolve(__dirname, "../src/index.html"),
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      // CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // Images
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },

    ],
  },
};
