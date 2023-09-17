const path = require("path");
const webpack = require('webpack'); 
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "timers": require.resolve("timers-browserify"),
      "dns": require.resolve("node-libs-browser/mock/dns")
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  },
};