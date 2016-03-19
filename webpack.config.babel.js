export default outputPath => ({
  module: {
    loaders: [
      { test: /\.css$/, loader: `style!css` },
      { test: /\.(ttf|eot|svg|woff2?)$/, loader: `file-loader` }
    ]
  }
})
