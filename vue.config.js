module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Narrative Labeling Tool',
        appId: 'io.shoya.narrative-labeling',
        mac: {
          icon: 'src/assets/icon.icns'
        },
        win: {
          icon: 'src/assets/icon.ico'
        }
      }
    }
  }
}
