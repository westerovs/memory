// Main constants

const MAX_PEOPLE = 999
const GODS = {
  SCARLET: '',
}

const CARDS = {
  data: [1, 2, 3, 4, 5, 6], // номер прибавляется к имени карты 'card' + id + '.png'
  key: 'card',
  maxCards: 12,
  cardWidth: 120,
  cardHeight: 168,
  cardOffset: {x: 4, y: 14},
  cardOffsetMinimap: {
    vertical: {
      x: 10,
      y: 15,
    },
    horizontal: {
      x: 17,
      y: 0,
    },
  },
  rows: 3,
  cols: 4,
}

const EVENTS = {
  mySignal: 'mySignal'
}

export {
  EVENTS,
  MAX_PEOPLE,
  GODS,
}
