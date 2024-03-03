const fs = require("fs");
const path = require("path");
const {imageToBase64} = require('./imagesToBase64.js')

async function createList(src, listName, filename,toBase64) {
  console.log('create assets list:', src)
  const list = [];

  await readDirs(src, list, toBase64)

  const output = `
    export const ${listName} = ${JSON.stringify(list)}
    window.${listName} = ${listName}
  `;

  fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', filename + '.js'),  output)
}

async function readDirs(dir, list, toBase64) {
  console.log('readDirs', dir)
  const dirPath = path.resolve(__dirname, '..', 'static', ...dir.split('/'))
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const stat = fs.statSync(path.resolve(dirPath, file))
    if (stat.isFile()) {
      if(!(/\.jpg|\.png/).test(path.extname(dirPath + file))) continue;
      let prefix = dir;
      prefix = prefix.split(dir).join('');
      const src = !toBase64 ? dir + '/' + file : await imageToBase64(path.resolve(dirPath, file))
      list.push({alias: prefix + file.split('.')[0], src})
    }
    if (stat.isDirectory()) {

      await readDirs(dir + '/' + file, list, toBase64 );
    }
  }
}

module.exports =  {createList}
