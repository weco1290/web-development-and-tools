const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/products.js",
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 8000, // Any available port is fine
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
