
const path = require('path');
const img64 = require('image-to-base64');

async function imageToBase64(src) {
  // console.log('imageToBase64', src)
  return img64(src).then((response) => {
    const extension = path.extname(src).split('.').join('')
    return `data:image/${extension};base64,${response}`
  })
}

module.exports =  {imageToBase64}
