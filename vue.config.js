const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 将entry指向examples
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 为components目录添加babel-loader处理
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.module
    .rule('js')
    .include
      .add(resolve('components'))
      .end()
    .use('babel')
      .loader('babel-loader')
      .tap(options => options)
  }
}