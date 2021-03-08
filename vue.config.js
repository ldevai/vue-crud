module.exports = {
  "devServer": {
    "host": "0.0.0.0",
    "port": 3000,
    "proxy": "http://localhost:8000"
  },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'vue-crud'
      return args
    })
  }
}