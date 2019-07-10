const webpack = require('webpack');

module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'kjhtml'],
    files: ['tests.webpack.js'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });

  if (process.env.TRAVIS) {
    const customLaunchers = {
      SL_Chrome_latest: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest',
        platform: 'Linux'
      },
      SL_Firefox_latest: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest',
        platform: 'Windows 10'
      },
      SL_Edge_Latest: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        version: 'latest',
        platform: 'Windows 10'
      },
      SL_Safari_10: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '10.0'
      }
    };

    config.sauceLabs = {
      testName: 'Cookies Unit Tests',
      startConnect: false
    };
    config.singleRun = true;
    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.reporters = ['spec', 'saucelabs'];
  }
};
