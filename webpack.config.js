// webpack.config.js
var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where all compiled assets will be stored
    .setOutputPath('web/assets/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/assets')

    .addEntry('common', './src/AppBundle/Resources/public/javascript/common.js')

    .addEntry('app', [
        './src/AppBundle/Resources/public/javascript/main.js'
    ])

    .addEntry('manage', [
        './src/AppBundle/Resources/public/javascript/manage/manage.js',
    ])

    .addEntry('buy', [
        './src/AppBundle/Resources/public/javascript/buy/buy.js',
    ])

    .addEntry('sell', [
        './src/AppBundle/Resources/public/javascript/sell/sell.js',
    ])

    .addEntry('ca', [
        './src/AppBundle/Resources/public/javascript/ca/ca.api.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.api.content.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.data.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.models.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.utils.js',
    ])

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableReactPreset()

    .enableSassLoader()

    .configureBabel((config) => {
        config.presets.push('stage-2');
    })

    .createSharedEntry('vendor', [

        'jquery',
        'webpack-jquery-ui',
        'react',
        'react-dom',
        'uikit',
        'moment',
        'uikit/dist/css/uikit.min.css',
        "react-datepicker",
        "react-modal",
        "react-popup",
        "react-redux",
        "react-table",
        "react-tooltip",
        "react-signature-pad",
        "react-tagsinput",
        "redux",
    ])

    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    //.enableBuildNotifications()

    // create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();