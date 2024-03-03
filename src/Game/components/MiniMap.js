import {Container} from 'pixi.js'

export default class MiniMap extends Container {
  constructor(game, config) {
    super(game)

    this.game = game
    this.config = config
    this.offset = config.CARDS.cardOffsetMinimap

    this.cards = []
    this.board = null
  }

  init() {
    this.board = createBoard.call(this, this.game, 215, 0, 'minimapBoardHorizontal')

    this.game.Signals.isCardMatched.add(id => this.showCard(id))
    this.runAnimation({alpha: 0.5,})
  }


  addItem(card, id) {
    this.add(card)
    this.cards.push(card)

    card._id = id
    card.anchor.set(0.5)
    card.alpha = 0
    card.scale.set(0.58)
  }

  showCard(id) {
    const card = this.cards.find((card) => card._id === id)
    tweenSetAlpha(this.game, card, 1)
  }

}
