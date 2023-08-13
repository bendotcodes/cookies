import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const basePlugins = [resolve(), commonjs()];

const external = ['react', 'universal-cookie'];
const globals = {
  react: 'React',
  'universal-cookie': 'UniversalCookie',
};

export default [
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactCookie.js',
      format: 'umd',
      name: 'ReactCookie',
      globals,
    },
    plugins: [
      ...basePlugins,
      replace({ 'process.env.NODE_ENV': '"development"' }),
    ],
    external,
  },
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactCookie.min.js',
      format: 'umd',
      name: 'ReactCookie',
      globals,
    },
    plugins: [
      ...basePlugins,
      replace({ 'process.env.NODE_ENV': '"production"' }),
      uglify(),
    ],
    external,
  },
];
