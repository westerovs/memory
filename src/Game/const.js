// Main constants

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
  isCardMatched: 'mySignal',
  isCardErrorMatched: 'mySignal',
  isCardActive: 'mySignal',
  checkHintState: 'mySignal',
}

export {
  EVENTS,
}
