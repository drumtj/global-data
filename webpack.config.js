const path = require("path");
const webpack = require("webpack");
// const WrapperPlugin = require('./WrapperPlugin');
// const WrapperPlugin = require('wrapper-webpack-plugin');
//
const ConcatSource = require("webpack-sources").ConcatSource;
const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");

class WrapperPlugin {

	/**
	 * @param {Object} args
	 * @param {string | Function} [args.header]  Text that will be prepended to an output file.
	 * @param {string | Function} [args.footer] Text that will be appended to an output file.
	 * @param {string | RegExp} [args.test] Tested against output file names to check if they should be affected by this
	 * plugin.
	 * @param {boolean} [args.afterOptimizations=false] Indicating whether this plugin should be activated before
	 * (`false`) or after (`true`) the optimization stage. Example use case: Set this to true if you want to avoid
	 * minification from affecting the text added by this plugin.
	 */
	constructor(args) {
		if (typeof args !== 'object') {
			throw new TypeError('Argument "args" must be an object.');
		}

		this.header = args.hasOwnProperty('header') ? args.header : '';
		this.footer = args.hasOwnProperty('footer') ? args.footer : '';
		this.afterOptimizations = args.hasOwnProperty('afterOptimizations') ? !!args.afterOptimizations : false;
		this.test = args.hasOwnProperty('test') ? args.test : '';
	}

	apply(compiler) {
		const header = this.header;
		const footer = this.footer;
		const tester = {test: this.test};

		compiler.hooks.compilation.tap('WrapperPlugin', (compilation) => {
			if (this.afterOptimizations) {
				compilation.hooks.afterOptimizeChunkAssets.tap('WrapperPlugin', (chunks) => {
					wrapChunks(compilation, chunks, footer, header);
				});
			} else {
				compilation.hooks.optimizeChunkAssets.tapAsync('WrapperPlugin', (chunks, done) => {
					wrapChunks(compilation, chunks, footer, header);
					done();
				})
			}
		});

		function wrapFile(compilation, fileName, chunkHash) {
			const headerContent = (typeof header === 'function') ? header(fileName, chunkHash) : header;
			const footerContent = (typeof footer === 'function') ? footer(fileName, chunkHash) : footer;

			compilation.assets[fileName] = new ConcatSource(
					String(headerContent),
					compilation.assets[fileName],
					String(footerContent));
		}

		function wrapChunks(compilation, chunks) {
			chunks.forEach(chunk => {
				const args = {
					hash: compilation.hash,
					chunkhash: chunk.hash
				};
				chunk.files.forEach(fileName => {
					if (ModuleFilenameHelpers.matchObject(tester, fileName)) {
						wrapFile(compilation, fileName, args);
					}
				});
			});
		}
	}
}

//
//

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
};

// module.exports = config;

let umdCfg = Object.assign({}, config);
umdCfg.output = {
  path: path.join(__dirname, "dist"),
  library: 'GlobalData',
  libraryTarget: "umd",
  filename: "./global-data.js"
}

let globalCfg = Object.assign({}, config);
globalCfg.output = {
  path: path.join(__dirname, "dist"),
  library: 'GlobalData',
  libraryTarget: "window",
  filename: "./global-data.var.js"
}
let pfh = `(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports['MyLibrary'] = factory();
  else
    root['MyLibrary'] = factory().default;
})(typeof self !== 'undefined' ? self : this, function() {
  return `.replace(/MyLibrary/g, 'GlobalData');
let pff = `\n})`

globalCfg.plugins = [
  new WrapperPlugin({
    test: /\.js$/,
    header: pfh,
    footer: pff
    // header: ('(function umdWrapper(root, factory) {' +
    //   '  if(typeof exports === "object" && typeof module === "object")' +
    //   '    module.exports = factory().default;' +
    //   '  else if(typeof define === "function" && define.amd)' +
    //   '    define("NAME", [], function() { return factory().default; });' +
    //   '  else if(typeof exports === "object")' +
    //   '    exports["NAME"] = factory().default;' +
    //   '  else' +
    //   '    root["NAME"] = factory().default;' +
    //   '})(this, function() {' +
    //   'return ').replace(/NAME/g, 'GlobalData'), // this is the name of the lib
    // footer: '\n})',
  }),
]

module.exports = [ umdCfg, globalCfg ];

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
