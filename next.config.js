const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

const sassConfig = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    }
};

module.exports = withPlugins([
    [withSass, sassConfig]
]);
