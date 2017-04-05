WebPack
===================

## General 
- [src](https://www.youtube.com/watch?v=9kJVYpOqcVU)
- WebPack is a module loader
- Module Loaders: Things that load/link your js files into the Browser
    - require.js
    - browserify
    - webpack
- Do both of these
    - ```npm install -s webpack```
    - ```npm install -g webpack``` (so you can run the webpack command)
- Create a webpack.config.js
- Here's a standard webpack.config.js
```(javascript)
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/scripts.js",
    output: {
        path: __dirname + "/js",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })   
    ]
};```
-[src](https://www.youtube.com/watch?v=C_ZtQClrVYw)
- Gulp and Grunt are essentially task runners
- By comparison, Browserify and webpack are bundlers
    - Bundle all the dependencies into a single js, css file, etc.
- Browserify is not actively maintained
- WebPack
    - Bundler
    - Plugins: minimification, etc.
    - Loaders: different way to handle different files (includes transpilers)
    - Optimizer 
    - Code Splitter
    - Dev Tool
- continues [here](https://www.youtube.com/watch?annotation_id=annotation_469069057&feature=iv&src_vid=C_ZtQClrVYw&v=eWmkBNBTbMM)
- [Another Src](https://www.youtube.com/watch?v=RKqRj3VgR_c)
- Build Time: How do we package?
- Load Time: How do we load?
- Ultimate output is a Webpack bundle: a javascript file
    - it can contain assetts of all kinds including javascript, html, css, and images
    - how those different types get into a bundle is handled by the **loaders**
- ```webpack -w ./entry.js bundle.js```
    - the -w switch will watch your entry point and any depedencies down the chain, and it they change, it will re-execute
- webpack understands AMD and CommonJS module syntax
- other commandline params:
    - devtool : keeps your files separate in the bundle
    - source-map : will output the js.map file as well (good for the js debugger)
- when you require css files in you entry point, webpack will complain bc it needs a special loader (by default it only works with js)    
    - ```npm install css-loader sylte-loader -D```
- you would add the following to your entry-point:
    ```(javascript)
    require('style!css!./style.css');```
    - This processes from Right to Left
    - This is basically a pipleine of 2 loaders, *css*, and *style*
    - Takes the style.css file and run it through the css-loader transformer, and then run it through the style transformer which will apply it to the page
    - Alternately, you can create a webpack.config.js
    ```(javascript)
    module.exports = {
        entry: './entry.js',
        output: {
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style!css!' }
            ]
        }
    } ```
- Webpack Dev Server
    - simple web server that will push changes into browser
    - ```webpack-dev-server --inline --hot```
    - will run everything in memory (not outputting to the bundle.js)
- Plugins
    - ```npm i ng-annotate-webpack-plugin -D```
    - Add a plugins node, which is a sibling to module
    ```(javascript)
    module.exports = {
        entry: './entry.js',
        output: {
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style!css!' }
            ]
        },
        plugins: [ 
            new ngAnnotatePlugin( { add: true })
        ]
    } ```
- PreLoader section of webpack.config.js
    - These are for things like deLinters
    - Be sure to add exclude conditions for node_modules

## WebPack Documentation Notes
- [src](https://webpack.github.io/docs)
- **Code Splitting**: Let's the developer decide how to package assets into bundles.  
    - Two extremese are:
        1. 1 bundle per assett
        2. 1 bundle for ALL assetts
    - These are both inefficient
    - The "split points" are chosen by the developer
- WebPack also handles bundling static assetts
- 2 types of Dependencies
    - Sync
    - Async: act as split points and form a new chunk.  A file is emitted for each chunk.
- **Loaders**- webpack can only process js files natively, but **loaders** are used to transform other resources into JS.
    - They are transformations that are applied on a resource file of your app. 
    - They are functions (running in node.js) that take the source of a resource file as the parameter and return the new source.  
    - Loaders can be **chained**. They are applied in a pipeline to the resource. 
    - The final loader is expected to return JavaScript; each other loader can return source in arbitrary format, which is passed to the next loader.
    - Specification of loaders in config file:
    ```(javascript)
    {
        module: {
            loaders: [
                { test: /\.jade$/, loader: "jade" },
                // => "jade" loader is used for ".jade" files

                { test: /\.css$/, loader: "style!css" },
                // => "style" and "css" loader is used for ".css" files
                // Alternative syntax:
                { test: /\.css$/, loaders: ["style", "css"] },
                
                {
                    test: /\.png$/,
                    loader: "url-loader",
                    query: { mimetype: "image/png" }  //THIS IS HOW YOU SPECIFY PARAMS
                }
            ]
        }
    }```
    
- typically, you want to put your source files under `src` or `app` and your bundles under `bin` or `dist`
- when do plugins run?  before or after loaders?
- Including css files:
    - we need the css-loader to process CSS files. 
    - We also need the style-loader to apply the styles in the CSS file

## WebPack and Angular2
- [src](https://angular.io/docs/ts/latest/guide/webpack.html)
- Typical to separate out bundles by
    - App
    - Vendor
- Typical to have a separate configuration file for each environment.
- Example Common Webpack Config File
```(javascript)
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  //the different entrypoints for each separate bundle
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  //use these extentions since most typescript import statements won't include an extension
  //We could add .css and .html later if we want Webpack to resolve extension-less files with
  //those extension too.
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },
  
  //CommonChuckPlugin is the plugin that figures out that overlapping dependencies
  //between app and vendor, and keeps them in vendor.
  
  //The HtmlWebPackPlugin tells WebPack what to do with the js and css files/links
  //it generates.
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```