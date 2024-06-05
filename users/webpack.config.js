const path = require('path');

module.exports = {
  entry: './src/root.component.js',
  output: {
    filename: 'users.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 8501,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
};
