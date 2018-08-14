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
      sl_iphone: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.10',
        version: '8.2',
        deviceName: 'iPhone Simulator'
      },
      sl_ipad: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.10',
        version: '8.2',
        deviceName: 'iPad Simulator'
      },
      sl_android: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '5.1',
        deviceName: 'Android Emulator'
      },
      sl_mac_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10',
        version: '8.0'
      },
      sl_mac_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.10',
        version: '36.0'
      },
      sl_mac_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.10',
        versiono: '41.0'
      },
      sl_windows7_ie11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '11.0'
      },
      sl_windows7_ie10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10.0'
      },
      sl_windows7_ie9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9.0'
      },
      sl_linux_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Linux',
        version: '37.0'
      },
      sl_linux_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Linux',
        version: '41.0'
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
