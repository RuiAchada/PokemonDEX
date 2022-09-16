const path = require("path")

module.exports = {
  entry: "./app/Main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundled.js"
  },
  mode: "development",
  devtool: "source-map", // debug: devtool: "eval-source-map",
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: { index: "index.html" } // always send index.html no matter the URL typed
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}
