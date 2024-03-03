const fs = require('fs');
const path = require("path");
const JSZip = require("jszip");

function createZip(folder, locale, test, output, sizeOf) {
  const dir = path.resolve(__dirname, '..', 'builds', folder, locale)
  let files = fs.readdirSync(dir)
  files = files.filter((filename) => test.test(filename))
  const contents = files.map((filename) =>  fs.readFileSync(path.resolve(dir, filename), "utf8"))

  const zip = new JSZip();
  files.forEach((filename, index) => {
    zip.file(filename, contents[index])
  })
  return new Promise((resolve) => {
    zip.generateAsync({type:"nodebuffer", compression: "DEFLATE",
      compressionOptions: {
        /* compression level ranges from 1 (best speed) to 9 (best compression) */
        level: 9
      }}).then(function(content) {
      const writeStream = fs.createWriteStream(path.resolve(dir, output + '.zip'))
      writeStream.on('close', () => {
        let files = fs.readdirSync(dir)
        const sizeOfFile = files.filter((file) => sizeOf.test(file))[0]
        const size = getSize(path.resolve(dir, sizeOfFile));
        console.log(sizeOfFile, size)
        fs.renameSync(path.resolve(dir, output + '.zip'), path.resolve(dir, output.replace('!D!', size) + '.zip'));
        resolve()
      })
      writeStream.write(content)
      writeStream.close()
    });
  })
}

function getSize(file) {
  const stats = fs.statSync(file)
  let size = Array.from(`${Math.ceil(stats.size / 1024)}`)
  if (size.length < 4) {
    console.log('correct size', size)
    const result = new Array(4).fill(0)
    for (let i = size.length - 1; i > -1; i--) {
      result[i + 4 - size.length] = size[i]
    }
    size = result
  }

  return size.join('')
}

module.exports = createZip