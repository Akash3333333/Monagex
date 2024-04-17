module.exports = {
    // Other webpack configurations...
    module: {
      rules: [
        // Other rules...
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  };
  