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
          { test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' }
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
      'SL_Chrome_latest': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest',
        platform: 'Linux'
      },
      'SL_Chrome_latest-1': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest-1',
        platform: 'Linux'
      },
      'SL_Chrome_latest-2': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'latest-2',
        platform: 'Linux'
      },
      'SL_Firefox_latest': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest',
        platform: 'Windows 10'
      },
      'SL_Firefox_latest-1': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest-1',
        platform: 'Windows 10'
      },
      'SL_Firefox_latest-2': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 'latest-2',
        platform: 'Windows 10'
      },
      'SL_Edge_Latest': {
        base: 'SauceLabs',
        browserName: 'microsoft edge',
        version: 'latest',
        platform: 'Windows 10'
      },
      'SL_Edge_Latest-1': {
        base: 'SauceLabs',
        browserName: 'microsoft edge',
        version: 'latest-1',
        platform: 'Windows 10'
      },
      'SL_Edge_Latest-2': {
        base: 'SauceLabs',
        browserName: 'microsoft edge',
        version: 'latest-2',
        platform: 'Windows 10'
      },
      'SL_InternetExplorer': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11.0',
        platform: 'Windows 7'
      },
      'SL_Safari_10': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '10.0'
      },
      'SL_iOS_latest': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'iOS 11.2',
        version: 'latest',
        deviceName: 'iPad Simulator'
      },
      'SL_Android_latest': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: 'latest',
        deviceName: 'Android Emulator'
      },
      'SL_Android_latest-1': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: 'latest-1',
        deviceName: 'Android Emulator'
      },
      'SL_Android_latest-2': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: 'latest-2',
        deviceName: 'Android Emulator'
      }
    };

    config.saceLabs = {
      testName: 'Cookies Unit Tests'
    };
    config.singleRun = true;
    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.reporters = ['spec', 'saucelabs'];
  }
};
