const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./src/index.tsx'],
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		overlay: true,
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true,
						},
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: false },
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({ filename: 'style.css' }),
	],
};
