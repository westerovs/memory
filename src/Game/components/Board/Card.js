import {Container, Graphics, Sprite, Texture} from 'pixi.js'

export default class Card extends Container {
  #game = window._game
  #refs = this.#game.refs

  constructor(x, y, size, color) {
    super()

    this.color = color
    this.size = size
    this.colorBorder = 0x96AEEC
    this.position.set(x, y)

    this.interactive = true
    this.on('pointerdown', this.#onPointerDown)
    this.#init()
  }

  #init = () => {
    const picCard = this.createCard('card-shirt', 'cardShirt')
    picCard.alpha = 1

    // cell.pivot.set(cell.width / 2, cell.height / 2)
    this.addChild(picCard)
  }

  #onPointerDown = () => {
    console.log('click')
  }

  createCard = (textureName, name) => {
    const pic = new Sprite(Texture.from(textureName))
    pic.position.set(0, 0)
    pic.label = name
    pic.visible = true
    pic.anchor.set(0.5)

    return pic
  }
}
