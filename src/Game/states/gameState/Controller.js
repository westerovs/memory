import {Container} from 'pixi.js'
// modules
import Cursor from '../../modules/Cursors/Cursor.js'
import Map from '../../components/Map/Map.js'
import {EVENTS} from '../../const.js'

export default class Controller extends Container {
  #game = null
  #refs = null
  // modules
  #mainCursor = new Cursor()
  #map = new Map()

  constructor(game) {
    super(game)

    this.#game = game
    this.#refs = game.view.refs
  }

  init = () => {
    this.#initSignals()
    this.#generateMap()
    console.log('Controller init')
  }

  #initSignals = () => {
    this.#game.on(EVENTS.mySignal, (data) => console.log(data))
  }

  #generateMap = () => {
    this.#map.generateBoard()

    window.map = this.#refs.miniMap
  }
}
