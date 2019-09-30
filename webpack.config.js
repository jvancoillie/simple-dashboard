var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enableSassLoader()
    .enableVersioning()
    .addEntry('js/app', './assets/js/app.js')
    .addEntry('js/admin', './assets/js/admin.js')
    .addStyleEntry('css/app', ['./assets/scss/app.scss'])
    .addStyleEntry('css/admin', ['./assets/scss/admin.scss'])
    .addStyleEntry('css/signin', ['./assets/scss/signin.scss'])
    .addStyleEntry('css/homepage', ['./assets/scss/homepage.scss'])
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .autoProvideVariables({
        moment: 'moment'
    })
    .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    .enablePostCssLoader()
    .copyFiles({
        from: './assets/images',
    })
;

module.exports = Encore.getWebpackConfig();
