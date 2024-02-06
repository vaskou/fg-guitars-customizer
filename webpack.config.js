// const isProduction = process.env.NODE_ENV === 'production';
// const path = require('path');
//
// module.exports = {
//     extends: path.resolve(__dirname,'./node_modules/@wordpress/scripts/config/webpack.config.js'),
//     devServer: isProduction
//         ? undefined
//         : {
//             static: {
//                 directory: path.join(__dirname, 'public'),
//             },
//         }
// }

const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const siteName = 'https://new.fremeditiguitars.com'

module.exports = {
    ...defaultConfig,
    plugins: [
        ...defaultConfig.plugins,
        new BrowserSyncPlugin({
            proxy: siteName,
            browser: 'chrome',
        }),
    ]
}