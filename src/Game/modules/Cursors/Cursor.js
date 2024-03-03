import {Sprite, Texture} from 'pixi.js'
import {gsap} from 'gsap'
import {clearTimeLine} from '../../utils/utils.js'

export default class Cursor {
  #game = window._game
  #cursor = null
  #timeline = gsap.timeline()

  constructor() {
    if (typeof Cursor.instance === 'object') {
      return Cursor.instance
    }

    this.#cursor = this.#createCursor()
    this.#init()

    Cursor.instance = this
    return Cursor.instance
  }

  #init = () => {
    this.#onHandlerInput()
  }

  #onHandlerInput = () => {
    const {wrapper} = this.#game.refs
    wrapper.interactive = true

    wrapper
      .on('pointerdown', ({data}) => this.#onPointerDown(data))
      .on('pointermove', ({data}) => this.#changePositionMarker(data))
  }

  #onPointerDown = (data) => {
    clearTimeLine(this.#timeline)

    this.#timeline.to(this.#cursor.scale, {x: 0.8, y: 0.8, duration: 0.1, yoyo: true, repeat: 1})
    this.#changePositionMarker(data)
  }


  #changePositionMarker = (data) => {
    console.log('move')
    const {x, y} = data.getLocalPosition(this.#game.app.stage)
    this.#cursor.position.set(x, y)
  }

  #createCursor = () => {
    const {wrapper} = this.#game.refs

    const cursor = new Sprite(Texture.from('cursor'))
    wrapper.addChild(cursor)

    return cursor
  }
}
