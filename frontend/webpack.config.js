const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/js/index.js",
		home: "./src/js/home.js",
		account: "./src/js/account.js",
	},
	output: {
		filename: "js/[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		assetModuleFilename: "assets/[name][ext]",
	},
	devtool: "eval-source-map",
	devServer: {
		static: "./dist",
		watchFiles: ["./src/**/*.html", "./src/css/**/*.css", "./src/js/**/*.js"],
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			template: "./src/home.html",
			filename: "home.html",
			chunks: ["home"],
		}),
		new HtmlWebpackPlugin({
			template: "./src/account.html",
			filename: "account.html",
			chunks: ["account"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
