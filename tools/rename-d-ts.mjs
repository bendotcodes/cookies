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
const renamePromises = files
  .filter((file) => /\.d\.ts$/.test(file))
  .map((file) => path.join(folder, file))
  .map((file) => ({
    oldFile: file,
    newFile: `${file.substring(0, file.length - extLength)}.d.mts`,
  }))
  .map((entry) => {console.log(entry); return entry; })
  .map((entry) => fs.rename(entry.oldFile, entry.newFile));

await Promise.all(renamePromises);
