// When using ESM, the default export won't work unless we use .d.mts instead of .d.ts extension
import fs from 'fs/promises';
import path from 'path';

if (process.argv.length < 3) {
  throw new Error('Missing folder');
}

const folder = process.argv[2];
console.log(folder);
const extLength = '.m.ts'.length;

const files = await fs.readdir(folder);
const promises = files
  .filter((file) => /\.d\.ts$/.test(file))
  .map(async (file) => {
    const fullFile = path.join(folder, file);
    const newFullFile = `${fullFile.substring(0, fullFile.length - extLength)}.d.mts`;

    await fs.rename(fullFile, newFullFile);

    const content = (await fs.readFile(newFullFile)).toString();
    const newContent = content.replaceAll(/ from \'([^']+)\'/g, ` from '$1.d.mts'`);

    await fs.writeFile(newFullFile, newContent);
  });

await Promise.all(promises);
