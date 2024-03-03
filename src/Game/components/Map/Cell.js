import {Container, Graphics, Sprite, Texture} from 'pixi.js'

export default class Cell extends Container {
  #game = window._game
  #refs = this.#game.refs

  constructor(x, y, size, color) {
    super()

    this.color = color
    this.size = size
    this.colorBorder = 0x96AEEC
    this.position.set(x, y)

    this.#init()
  }

  #init = () => {
    const cell = this.#createCellGraphics()
    const picBrick = this.createPic('map-brick2', 'cellBrick')

    cell.pivot.set(cell.width / 2, cell.height / 2)
    this.addChild(picBrick)
  }

  #createCellGraphics = () => {
    const rect = new Graphics()
    if (this.color) {
      rect.fill(+this.color)
      rect.setStrokeStyle(this.colorBorder)
    }
    rect.roundRect(0, 0, this.size, this.size, 10)
    rect.fill()

    return rect
  }

  createPic = (textureName, name) => {
    const pic = new Sprite(Texture.from(textureName))
    pic.position.set(0, 0)
    pic.label = name
    pic.visible = true
    pic.anchor.set(0.5)

    return pic
  }
}
