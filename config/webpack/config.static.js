const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filename = '[name].[hash:4]';

module.exports = {
	entry: ['./src/index.tsx'],
	output: {
		path: resolve(__dirname, '../../', 'static'),
		filename: `${filename}.js`,
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						loader: 'awesome-typescript-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
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
		new MiniCssExtractPlugin({
			filename: `${filename}.css`,
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: './index.html',
		}),
	],
};
