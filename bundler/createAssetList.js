const {createList} = require('../utils/createList.js')

let options = [...process.argv]

if (!options) {
  console.error('options don\'t exist');
  process.exit()
}



createList(options[3], options[5], options[7], !!(options[9] && options[9] === 'true'))
