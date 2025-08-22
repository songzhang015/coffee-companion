const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
		historyApiFallback: {
			rewrites: [
				{ from: /^\/$/, to: "/index.html" },
				{ from: /^\/home$/, to: "/home.html" },
				{ from: /^\/account$/, to: "/account.html" },
			],
		},
		watchFiles: ["./src/**/*.html", "./src/css/**/*.css", "./src/js/**/*.js"],
		open: true,
		port: 8080,
		proxy: [
			{
				context: ["/api"],
				target: "http://localhost:5000",
				changeOrigin: true,
			},
		],
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
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
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
