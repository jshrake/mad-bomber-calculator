module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    contentBase: './public',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
};
