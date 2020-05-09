const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

let baseConfig = {
  PAZL_BASE_PATH: 'pazl',
}
let config = {}

try {
  config = require('./pazl.config.json')
  config = Object.keys(baseConfig).reduce((acc, key) => {
    let value
    if (key in config) {
      value = config[key]
    } else {
      value = baseConfig[key]
    }
    if (typeof value === 'string') {
      value = JSON.stringify(value)
    }
    acc[key] = value
    return acc
  }, {})
} catch {
  config = baseConfig
}
console.log('Pazl config:', config)

module.exports = [
  // JS
  {
    target: 'web',
    entry: {
      app: path.resolve(__dirname, 'puzzle/assets/js'),
    },
    output: {
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'puzzle/assets/bundles/js'),
      publicPath: `/${JSON.parse(config.PAZL_BASE_PATH)}/static/bundles/js/`,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'puzzle/assets/js'),
        api: path.resolve(__dirname, 'puzzle/assets/js/api'),
        components: path.resolve(__dirname, 'puzzle/assets/js/components'),
        utils: path.resolve(__dirname, 'puzzle/assets/js/utils'),
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
      new Webpack.DefinePlugin(config),
    ],
    mode: 'development',
  },
  // SCSS
  {
    entry: {
      admin: path.resolve(__dirname, 'puzzle/assets/scss/admin.scss'),
      editor: path.resolve(__dirname, 'puzzle/assets/scss/editor.scss'),
      login: path.resolve(__dirname, 'puzzle/assets/scss/login.scss'),
      page: path.resolve(__dirname, 'puzzle/assets/scss/page.scss'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'puzzle/assets/bundles/css'),
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
