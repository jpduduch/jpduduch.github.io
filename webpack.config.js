const path = require('path') /* busca o path da aplicação e atribui aos comandos path.etc */
const Webpack = require('webpack')

/* Webpack é um compilador que consegue juntar todos os arquivos src como .sass e .js e gerar os outputs a serem lidos pelo browser */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') /* Puxa todos os estilos css de um js e compila num arquivo css, evitando o problema css in js */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirSrc = path.join(__dirname, 'src')
const dirJs = path.join(dirSrc, 'js')
const dirSass = path.join(dirSrc, 'sass')
const dirImg = path.join(dirSrc, 'img')

const dirNode = 'node_modules'

/* estas 3 linhas de código são as pastas onde estarão os arquivos do projeto */

// console.log(dirJs, dirShared, dirSass)

// module exports é o comando que exporta as funções etc geradas aqui para serem usadas por outros arquivos

module.exports = {
    entry: [
        path.join(dirJs, 'index.js'),
        path.join(dirSass, 'screen.scss')
    ],

    resolve: {
        modules: [
            dirJs,
            dirSass,
            dirImg,
            dirNode
        ]
    },

    devServer: {
        before: function (app, server) {
            server._watch('./bin/**/*.html')
        },
        contentBase: path.join(__dirname),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },

    plugins: [
        new Webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),

        // new Webpack.ProvidePlugin({
        // // uma forma de importar libraries para seu projeto. só incluir aqui dentro que já era. o lado ruim é que pode começar a deixar seu projeto pesado se vc perder o controle
        // }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }]
                ]
            }
        })
    ],

    module: {
        rules: [
            { // js
                test: /\.js$/,
                use: { loader: 'babel-loader' }
            },

            { // css
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: '' } },
                    { loader: 'css-loader?url=false' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            },

            { // imagens
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    // outputPath: 'images', //coloca numa subpasta
                    name(file) {
                        return '[hash].[ext]'
                    },
                },
            },

            { // minifier
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader
                    }
                ]
            },

            { //fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },


            { // webGL
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            },
            { // webGL
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), //minimizar somente em produção
            new TerserPlugin()
        ]
    }
}


