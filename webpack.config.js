const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point of your application
  output: {
    filename: 'bundle.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
    },
  },
};
