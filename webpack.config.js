module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
    test: /\.css$/,
    loader: 'style-loader'
  }, {
    test: /\.css$/,
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  }
]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
