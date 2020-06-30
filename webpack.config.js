module.exports = [{
    entry: __dirname + '/public/js/react/src/index.jsx',
    output: {
      path: __dirname + '/public/js/react/dist/',
      filename: 'index.js',
      publicPath: '/'
    },
    module: {
        rules: [ 
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                  ]
            }
        ]
    }
},
{
    entry: __dirname + '/public/js/react/src/chat/main.jsx',
    output: {
      path: __dirname + '/public/js/react/dist/',
      filename: 'main.js',
      publicPath: '/'
    },
    module: {
        rules: [ 
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                  ]
            }
        ]
    }
}]