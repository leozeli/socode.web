module.exports = {
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify"),
    },
  },
}
