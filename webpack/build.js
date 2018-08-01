const path = require('path')
module.exports = {
    entry: {
        'validation-class': './src/index',
    },
    output: {
        path: path.join('./dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'validation-class',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }]
    }
}
