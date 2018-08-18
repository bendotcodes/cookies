import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const basePlugins = [
  resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs()
];

export default [
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactCookie.js',
      format: 'umd',
      name: 'ReactCookie'
    },
    plugins: [
      ...basePlugins,
      replace({ 'process.env.NODE_ENV': '"development"' })
    ]
  },
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactCookie.min.js',
      format: 'umd',
      name: 'ReactCookie'
    },
    plugins: [
      ...basePlugins,
      replace({ 'process.env.NODE_ENV': '"production"' }),
      uglify()
    ]
  }
];
