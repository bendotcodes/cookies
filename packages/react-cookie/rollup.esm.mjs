import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';

export default {
  input: Object.fromEntries(
    glob
      .sync('src/**/*.{ts,tsx}')
      .map((file) => [
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length),
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
  output: {
    dir: './esm',
    format: 'esm',
    entryFileNames: '[name].mjs',
  },
  plugins: [typescript()],
  external: ['react', 'universal-cookie', 'hoist-non-react-statics'],
};
