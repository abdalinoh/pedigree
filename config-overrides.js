const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify')
  }),
  addWebpackModuleRule({
    test: /\.js$/,
    include: path.resolve(__dirname, 'node_modules/asn1.js'),
    resolve: {
      fallback: {
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify')
      }
    }
  })
);
