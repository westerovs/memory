import {Container} from 'pixi.js'
// modules
import Board from '../../components/Board/Board.js'
import {EVENTS} from '../../const.js'

export default class Controller extends Container {
  #game = null
  #refs = null
  // modules
  #board = new Board()

  constructor(game) {
    super(game)

    this.#game = game
    this.#refs = game.view.refs
  }

  init = () => {
    this.#initSignals()
    this.#generateBoard()
    console.log('Controller init')
  }

  #initSignals = () => {
    // this.#game.on(EVENTS.mySignal, (data) => console.log(data))
  }

  #generateBoard = () => {
    this.#board.generateBoard()
    window.map = this.#refs.board
  }
}
