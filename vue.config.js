const path = require('path');

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },
};
