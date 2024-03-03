import Cell from './Card.js'
import {config} from '../../config.js'

const CELL_SIZE = 80

export default class Board {
  #game = window._game
  #refs = this.#game.refs
  #cells = []
  #map = config.LEVELS.LV2.MAP

  constructor(props) {

  }

  get getCells() {
    return this.#cells
  }

  generateBoard = () => {
    let cells = []
    let index = 0

    for (let row = 0; row < this.#map.length; row++) {
      for (let col = 0; col < this.#map[row].length; col++) {

        const cellType = this.#map[row][col]
        if (cellType !== 'empty') {
          const cellContainer = new Cell(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE
          )
          cells.push(cellContainer)

          this.#cells.push(cellContainer)
          this.#refs.board.addChild(cellContainer)
          index++
        }
      }
    }

    return cells
  }
}
