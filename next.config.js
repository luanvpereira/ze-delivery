const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

const sassConfig = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: "[local]___[hash:base64:5]",
	}
};

const nextConfig = {
	webpack: config => {
		config.module.rules.push({
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000
				}
			}
		});

		return config;
	},
};

module.exports = withPlugins([
	[withSass, sassConfig]
], nextConfig);
