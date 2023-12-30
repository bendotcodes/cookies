import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

const mainFields = ['module', 'jsnext:main', 'main', 'browser'];
const external = ['cookie'];

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: './esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [typescript({ outDir: './esm' })],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      dir: './cjs',
      format: 'cjs',
    },
    plugins: [
      typescript({ outDir: './cjs' }),
      babel({ babelHelpers: 'bundled' }),
    ],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/universalCookie.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [resolve({ mainFields }), typescript({ outDir: './umd' })],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/universalCookie.min.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [
      resolve({ mainFields }),
      typescript({ outDir: './umd' }),
      terser(),
    ],
    external,
  },
];
