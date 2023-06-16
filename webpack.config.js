const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with the entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // Replace with the desired output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js']
          }
        }
      }
    ]
  }
};