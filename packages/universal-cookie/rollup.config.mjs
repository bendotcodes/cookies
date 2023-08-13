import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const basePlugins = [
  resolve({
    mainFields: ['module', 'jsnext:main', 'main', 'browser'],
  }),
  commonjs(),
];

export default [
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/universalCookie.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [...basePlugins],
  },
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/universalCookie.min.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [...basePlugins, terser()],
  },
];
