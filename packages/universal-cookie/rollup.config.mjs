import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: './esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [resolve(), commonjs(), typescript({ outDir: './esm' })],
    external: [], // cookie library is not ESM compatible so we transform it
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
    external: ['cookie'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/universalCookie.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [resolve(), commonjs(), typescript({ outDir: './umd' })],
    external: [], // cookie library is not UMD compatible so we transform it
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/universalCookie.min.js',
      format: 'umd',
      name: 'UniversalCookie',
    },
    plugins: [resolve(), commonjs(), typescript({ outDir: './umd' }), terser()],
    external: [], // cookie library is not UMD compatible so we transform it
  },
];
