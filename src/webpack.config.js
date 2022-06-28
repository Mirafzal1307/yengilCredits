// webpack.config.js
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new Dotenv()],
  // devtool: "#eval-source-map",
  devtool: "inline-source-map",
};
