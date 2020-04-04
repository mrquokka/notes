module.exports = {
  configureWebpack: {
    devServer: {
      clientLogLevel: 'info',
      watchOptions: {
        poll: true
      }
    }
  }, chainWebpack: (config) => {
    config.plugins.delete('preload')
  }
}
