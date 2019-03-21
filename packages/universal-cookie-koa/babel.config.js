module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    'babel-plugin-add-module-exports'
  ]
};
