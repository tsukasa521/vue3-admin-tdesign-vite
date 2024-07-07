const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolvePath (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 处理标题
    config.plugin('html').tap((args) => {
      args[0].title = '管理系统'
      return args
    })

    // 处理svg
    config.module.rule('svg').exclude.add(resolvePath('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolvePath('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://119.45.63.103:8091/'
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  }
})
