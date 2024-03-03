const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const { createList } = require('../utils/createList.js');

let options = [...process.argv]

if (!options) {
  console.error('options don\'t exist');
  process.exit()
}

const rl = readline.createInterface({ input, output });

rl.question('Введите имя папки локализации: ', (answer) => {
  console.log(
    `выбрана локализация: ${answer}`
  );

  const locale = answer;

  rl.close();

  createList(options[3] + locale, options[5], options[7], !!(options[9] && options[9] === 'true'))
});

