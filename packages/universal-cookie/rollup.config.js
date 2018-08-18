import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
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
      file: 'umd/universalCookie.js',
      format: 'umd',
      name: 'UniversalCookie'
    },
    plugins: [...basePlugins]
  },
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/universalCookie.min.js',
      format: 'umd',
      name: 'UniversalCookie'
    },
    plugins: [...basePlugins, uglify()]
  }
];
