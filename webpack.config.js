const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => {
  const mode = (argv || {}).mode || 'development';
  return {
    mode,
    entry: ['./src/index.tsx'],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
        },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [{ loader: 'url-loader', options: { limit: 50000 } }],
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              issuer: /\.[jt]sx?$/,
              use: ['@svgr/webpack'],
            },
            {
              type: 'asset/resource',
              generator: {
                filename: 'images/[name].[hash:7].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // favicon: './src/images/logo.svg',
      }),
      new MiniCssExtractPlugin({ filename: 'app_[chunkhash].css' }),
      new DefinePlugin({ 'process.env': { TARGET_ENV: JSON.stringify(env.TARGET_ENV) } }),
    ],
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@tanstack/react-query': path.join(__dirname, '/node_modules/@tanstack/react-query'),
        components: path.resolve(__dirname, './src/components'),
        constants: path.resolve(__dirname, './src/constants'),
        hooks: path.resolve(__dirname, './src/hooks'),
        images: path.resolve(__dirname, './src/images'),
        pages: path.resolve(__dirname, './src/pages'),
        services: path.resolve(__dirname, './src/services'),
        styles: path.resolve(__dirname, './src/styles'),
        types: path.resolve(__dirname, './src/types'),
      },
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/',
    },
    devServer: {
      port: 3008,
      open: '/',
      historyApiFallback: true,
      static: './dist',
    },
  };
};
