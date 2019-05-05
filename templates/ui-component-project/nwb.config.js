module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'sic-asset-component',
      externals: {
        react: 'React'
      }
    }
  }
}
