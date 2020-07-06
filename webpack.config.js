const AotPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyPlugin = require('copy-webpack-plugin');

// const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
// const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");

const shellConfig = {
  entry: ["./projects/shell/src/polyfills.ts", "./projects/shell/src/main.ts"],
  resolve: {
    mainFields: ["browser", "module", "main"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/shell"),
    port: 5000
  },  
  module: {
    rules: [
      { test: /\.ts$/, loader: "@ngtools/webpack" }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {},
      shared: ["@angular/core", "@angular/common", "@angular/router", "rxjs"]
    }),
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: "./projects/shell/tsconfig.app.json",
      directTemplateLoading: true,
      entryModule: path.resolve(
        __dirname,
        "./projects/shell/src/app/app.module#AppModule"
      )
    }),
    new CopyPlugin([
      { from: 'projects/shell/src/assets', to: 'assets' },
    ]),    
    new HtmlWebpackPlugin({
      template: "./projects/shell/src/index.html"
    })
  ],
  output: {
    filename: "[id].[name].js",
    path: __dirname + "/dist/shell",
    chunkFilename: "[id].[chunkhash].js"
  },
  devtool: 'inline-source-map',
  mode: "production"
};

const mfe1Config = {
  entry: ["./projects/mfe1/src/polyfills.ts", "./projects/mfe1/src/main.ts"],
  resolve: {
    mainFields: ["browser", "module", "main"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/shell/mfe1"),
    port: 3000
  },  
  module: {
    rules: [
      { test: /\.ts$/, loader: "@ngtools/webpack" }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe1",
      library: { type: "var", name: "mfe1" },
      filename: "mfe1RemoteEntry.js",
      exposes: {
        Component: './projects/mfe1/src/app/app.component.ts',
        Module: './projects/mfe1/src/app/flights/flights.module.ts'
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    }),
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: "./projects/mfe1/tsconfig.app.json",
      directTemplateLoading: true,
      entryModule: path.resolve(
        __dirname,
        "./projects/mfe1/src/app/app.module#AppModule"
      )
    }),
    new CopyPlugin([
      { from: 'projects/mfe1/src/assets', to: 'assets' },
    ]),    
    new HtmlWebpackPlugin({
      template: "./projects/mfe1/src/index.html"
    })
  ],
  output: {
    publicPath: "http://localhost:5000/mfe1/",
    filename: "[name].js",
    path: __dirname + "/dist/shell/mfe1",
    chunkFilename: "[id].[chunkhash].js"
  },
  mode: "production"
};

const mfe2Config = {
  entry: ["./projects/mfe2/src/polyfills.ts", "./projects/mfe2/src/main.ts"],
  resolve: {
    mainFields: ["browser", "module", "main"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/shell/mfe2"),
    port: 3000
  },  
  module: {
    rules: [
      { test: /\.ts$/, loader: "@ngtools/webpack" }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe2",
      library: { type: "var", name: "mfe2" },
      filename: "mfe2RemoteEntry.js",
      exposes: {
        Component: './projects/mfe2/src/app/app.component.ts',
        Module: './projects/mfe2/src/app/bookings/bookings.module.ts'
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    }),
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: "./projects/mfe2/tsconfig.app.json",
      directTemplateLoading: true,
      entryModule: path.resolve(
        __dirname,
        "./projects/mfe2/src/app/app.module#AppModule"
      )
    }),
    new CopyPlugin([
      { from: 'projects/mfe2/src/assets', to: 'assets' },
    ]),    
    new HtmlWebpackPlugin({
      template: "./projects/mfe2/src/index.html"
    })
  ],
  output: {
    publicPath: "http://localhost:5000/mfe2/",
    filename: "[name].js",
    path: __dirname + "/dist/shell/mfe2",
    chunkFilename: "[id].[chunkhash].js"
  },
  mode: "production"
};

const testPluginConfig = {
  entry: ["./projects/test_plugin/src/polyfills.ts", "./projects/test_plugin/src/main.ts"],
  resolve: {
    mainFields: ["browser", "module", "main"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/shell/test_plugin"),
    port: 3000
  },  
  module: {
    rules: [
      { test: /\.ts$/, loader: "@ngtools/webpack" }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "test_plugin",
      library: { type: "var", name: "test_plugin" },
      filename: "test_pluginRemoteEntry.js",
      exposes: {
        Component: './projects/test_plugin/src/app/app.component.ts',
        Module: './projects/test_plugin/src/app/app.module.ts'
      },
      shared: ["@angular/core", "@angular/common", "@angular/router", "rxjs"]
    }),
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: "./projects/test_plugin/tsconfig.app.json",
      directTemplateLoading: true,
      entryModule: path.resolve(
        __dirname,
        "./projects/test_plugin/src/app/app.module#AppModule"
      )
    }),
    new CopyPlugin([
      { from: 'projects/test_plugin/src/assets', to: 'assets' },
    ]),    
    new HtmlWebpackPlugin({
      template: "./projects/test_plugin/src/index.html"
    })
  ],
  output: {
    publicPath: "http://localhost:5000/test_plugin/",
    filename: "[name].js",
    path: __dirname + "/dist/shell/test_plugin",
    chunkFilename: "[id].[chunkhash].js"
  },
  mode: "production"
};


module.exports = [shellConfig, mfe1Config, mfe2Config, testPluginConfig];
