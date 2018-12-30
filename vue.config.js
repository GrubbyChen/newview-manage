module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      [process.env.VUE_APP_PROXY_PREFIX]: {
        target: process.env.VUE_APP_SERVER_URI,
        changeOrigin: true
      }
    }
  }
}
