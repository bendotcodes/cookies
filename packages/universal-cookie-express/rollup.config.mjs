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
];
