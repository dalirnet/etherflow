const path = require('path')
const terserPlugin = require('terser-webpack-plugin')

const pathResolver = (...args) => {
    return path.resolve(__dirname, ...args)
}

module.exports = {
    target: 'node',
    entry: pathResolver('src', 'index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new terserPlugin({
                extractComments: false,
            }),
        ],
    },
    output: {
        filename: 'index.js',
        library: 'etherflow',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
        path: pathResolver('dist'),
    },
}
