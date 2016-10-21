module.exports = {

  entry : {
    app : './client.js'
  },

  output : {
    filename : './views/bundle.js'
  //  sourceMapFilename : 'public/build/bundle.map'
  },

  devtool : '#source-map',

  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        loader : 'babel',
        query : {

          presets : ['react','es2015']

        }
      }
    ]
  }


}
