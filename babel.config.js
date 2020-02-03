module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@': './puzzle/assets/js/',
        },
      },
    ],
  ],
  presets: ['@babel/preset-env'],
}
