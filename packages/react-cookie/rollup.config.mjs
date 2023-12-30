import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

const external = ['react', 'universal-cookie'];
const globals = {
  react: 'React',
  'universal-cookie': 'UniversalCookie',
};

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: './esm',
      format: 'esm',
      entryFileNames: '[name].mjs'
    },
    plugins: [typescript({ outDir: './esm' })],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      dir: './cjs',
      format: 'cjs'
    },
    plugins: [typescript({ outDir: './cjs' }), babel({ babelHelpers: 'bundled' })],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/reactCookie.js',
      format: 'umd',
      name: 'ReactCookie',
      globals,
    },
    plugins: [
      commonjs(),
      resolve(), 
      typescript({ outDir: 'umd' }),
      replace({ preventAssignment: true, 'process.env.NODE_ENV': '"development"' }),
    ],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'umd/reactCookie.min.js',
      format: 'umd',
      name: 'ReactCookie',
      globals,
    },
    plugins: [
      commonjs(),
      resolve(), 
      typescript({ outDir: 'umd' }),
      replace({ preventAssignment: true, 'process.env.NODE_ENV': '"production"' }),
      terser(),
    ],
    external,
  },
];
