const path = require('path')

const port = process.env.CONTAINER_PORT || 3000
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    entry: [
        `webpack-dev-server/client?http://localhost:${port}`,
        './client/src/App.tsx',
    ],
    output: {
        path: path.resolve(__dirname, 'client', 'public'),
        filename: 'bundle.js',
    },

    performance: {
        hints: false,
    },
    devServer: {
        static: './client/public',
        proxy: {
            '/': {
                target: 'http://localhost:3001',
            },
        },
        port: 3000,
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './client/index.html',
            filename: './index.html',
        }),
    ],
}
