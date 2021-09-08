const path = require("path");
//bring webpack's methods and properties into the config file
const webpack = require("webpack");

//main configuration object
//basic configuration needs 3 properties: entry, output and mode
//entry: root of the bundle and the beginning of the dependency graph
//output: takes bundled code into the folder specified( dist(distrubution))
//mode: what state you would like to run the webpack in. 
//Default is production-here webpack will minify our code for us automatically  along with some other nice additions
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    //directs webpack in what to do
    //providePlugin to define $ and jQuery
    plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
    ],
    mode: 'development'
};

