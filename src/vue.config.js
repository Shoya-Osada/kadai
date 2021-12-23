
module.exports = {
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore = ['./index.html', '.DS_Store']
      return [options]
    })
  }
}