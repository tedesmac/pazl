const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = [
  // JS
  {
    target: "web",
    entry: path.resolve(__dirname, "assets/js/index.js"),
    output: {
      chunkFilename: "[name].bundle.js",
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "assets/bundles/js"),
      publicPath: "/static/bundles/js/"
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      },
      extensions: [".js", ".json", ".vue"]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: "vue-loader"
        }
      ]
    },
    plugins: [
      new BundleTracker({
        filename: "stats.js.json",
        path: __dirname
      }),
      new VueLoaderPlugin()
    ],
    mode: "development"
  },
  // SCSS
  {
    entry: path.resolve(__dirname, "assets/scss/main.scss"),
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "assets/bundles/css")
    },
    resolve: {
      extensions: [".scss"]
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new BundleTracker({
        filename: "stats.css.json",
        path: __dirname
      }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css"
      })
    ],
    mode: "development"
  }
];
