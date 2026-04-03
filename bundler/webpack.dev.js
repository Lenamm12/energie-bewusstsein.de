const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");

module.exports = merge(commonConfiguration, {
  mode: "development",
  stats: "errors-warnings",
  infrastructureLogging: {
    level: "warn",
  },
  devServer: {
    host: "local-ip",
    port: 8080,
    open: true,
    server: "http",
    allowedHosts: "all",
    hot: true,
    watchFiles: ["src/**", "static/**"],
    static: {
      directory: "./static",
      watch: true,
    },
    client: {
      overlay: true,
    },
  },
});
