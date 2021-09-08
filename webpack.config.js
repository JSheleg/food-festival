const path = require("path");
//bring webpack's methods and properties into the config file
const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//main configuration object
//basic configuration needs 3 properties: entry, output and mode
//entry: root of the bundle and the beginning of the dependency graph
//output: takes bundled code into the folder specified( dist(distrubution))
//mode: what state you would like to run the webpack in. 
//Default is production-here webpack will minify our code for us automatically  along with some other nice additions
module.exports = {
    entry: {
        app:'./assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + "/dist",
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url){
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            }
        ]
    },
    //directs webpack in what to do
    //providePlugin to define $ and jQuery
    plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            //value set to disable will temporarily stop the reporting and automatic open of the report in the browser
            analyzerMode: "static", // the report outputs to an HTML file  report.html in the dist folder
        })
    ],
    mode: 'development'
};

