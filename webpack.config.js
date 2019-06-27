const path = require("path");
const webpack = require("webpack");

const config = {
  mode: "production",// "none"
  entry: "./lib/index.ts",
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  cache: true,
  devtool: "source-map"
  , output: {
    path: path.join(__dirname, "dist"),
    library: 'GlobalData',
    libraryTarget: "umd",
    filename: "./global-data.js"
  }
  // ,output: {
  //   library: {
  //     root: 'GlobalData',
  //     amd: 'a',
  //     commonjs: 'b'
  //   },
  //   libraryTarget: 'umd'
  // }
};

module.exports = config;

// let umdCfg = Object.assign({}, config);
// umdCfg.output = {
//   path: path.join(__dirname, "dist"),
//   library: 'GlobalData',
//   libraryTarget: "umd",
//   filename: "./global-data.js"
// }
//
// let amdCfg = Object.assign({}, config);
// amdCfg.output = {
//   path: path.join(__dirname, "dist"),
//   library: 'GlobalData',
//   libraryTarget: "amd",
//   filename: "./global-data.amd.js"
// }
//
// let commonCfg = Object.assign({}, config);
// commonCfg.output = {
//   path: path.join(__dirname, "dist"),
//   library: 'GlobalData',
//   libraryTarget: "commonjs2",
//   filename: "./global-data.common.js"
// }
//
// let esmCfg = Object.assign({}, config);
// esmCfg.output = {
//   path: path.join(__dirname, "dist"),
//   library: 'GlobalData',
//   libraryTarget: "system",
//   filename: "./global-data.esm.js"
// }
//
// module.exports = [ umdCfg, amdCfg, commonCfg, esmCfg ];
