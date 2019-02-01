// webpack.config.js
//var Encore = require('@symfony/webpack-encore');
var path = require('path');

const Encore = require('@symfony/webpack-encore')

if (!Encore.runtimeIsConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
// the project directory where all compiled assets will be stored
    .setOutputPath('web/assets/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/assets')

    .addEntry('common', './src/AppBundle/Resources/public/javascript/common.js')

    .addEntry('main', [
        './src/AppBundle/Resources/public/javascript/main/main.js'
    ])

    .addEntry('ca', [
        './src/AppBundle/Resources/public/javascript/ca/ca.api.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.api.content.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.data.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.utils.js',
    ])

    .addAliases({
        '@components': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/components/'),
        '@utils': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/utils/'),
        '@constants': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/constants.js'),
        '@icons': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/main/components/Icons.js'),
    })

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
        'prop-types',
        'query-string',
        'moment',
        "react-datepicker",
        "react-modal",
        "react-popup",
        "react-router-dom",
        "react-redux",
        "react-select",
        "react-table",
        "react-toggle",
        "react-tooltip",
        "react-signature-pad",
        "react-tagsinput",
        "redux-i18n",
        "redux",
        "babel-polyfill"
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