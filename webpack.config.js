const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = [
  // JS
  {
    target: 'web',
    entry: {
      admin: path.resolve(__dirname, 'assets/js/admin'),
      editor: path.resolve(__dirname, 'assets/js/editor'),
      login: path.resolve(__dirname, 'assets/js/login'),
      page: path.resolve(__dirname, 'assets/js/page'),
      root: path.resolve(__dirname, 'assets/js/root'),
    },
    output: {
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'assets/bundles/js'),
      publicPath: '/puzzle/static/bundles/js/',
    },
    resolve: {
      alias: {
        api: path.resolve(__dirname, 'assets/js/api'),
        components: path.resolve(__dirname, 'assets/js/components'),
        utils: path.resolve(__dirname, 'assets/js/utils'),
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['.js', '.json', '.vue'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: 'vue-loader',
        },
      ],
    },
    plugins: [
      new BundleTracker({
        filename: 'stats.js.json',
        path: __dirname,
      }),
      new VueLoaderPlugin(),
    ],
    mode: 'development',
  },
  // SCSS
  {
    entry: {
      admin: path.resolve(__dirname, 'assets/scss/admin.scss'),
      editor: path.resolve(__dirname, 'assets/scss/editor.scss'),
      login: path.resolve(__dirname, 'assets/scss/login.scss'),
      page: path.resolve(__dirname, 'assets/scss/page.scss'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'assets/bundles/css'),
    },
    resolve: {
      extensions: ['.scss'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new BundleTracker({
        filename: 'stats.css.json',
        path: __dirname,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
      }),
    ],
    mode: 'development',
  },
]
