module.exports = function (context, options) {
  return {
    name: "custom-loader",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            path: require.resolve("path-browserify"),
          },
          fallback: {
            fs: false,
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser"),
          },
        },
      };
    },
  };
};
