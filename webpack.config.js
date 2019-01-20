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
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .autoProvideVariables({
        moment: 'moment',
        snapsvg: 'snapsvg'
    })
    .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    .addRule({
        test: require.resolve('snapsvg/dist/snap.svg.js'),
        use: 'imports-loader?this=>window,fix=>module.exports=0',
    })
    .addAliases({
        snapsvg: 'snapsvg/dist/snap.svg.js',
    })
;

module.exports = Encore.getWebpackConfig();
