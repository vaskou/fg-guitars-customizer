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