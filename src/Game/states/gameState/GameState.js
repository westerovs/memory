import GameView from './GameView.jsx'
import BaseState from '../BaseState.js'
import {gsap} from 'gsap'
import Controller from './Controller.js'

export default class GameState extends BaseState {
  #game = null
  #view = null
  #controller = null

  constructor(game) {
    super(game)
    this.#game = game
    this.#controller = null
  }

  get initEventName() {
    return 'state:gamestate'
  }

  initialize() {
    this.#view = new GameView(this.#game)
    this.#game.viewport.addChild(this.#view)
    this.#game.view = this.#view
    this.#game.refs = this.#view.refs
    this.resize()

    this.initialized = true

    this.#startGame()
  }

  resize() {
    this.#view.resize()
  }

  terminate() {
    this.initialized = false
    this.#view.destroy()
    this.#view = null
  }

  #startGame() {
    this.#initSignals()
    this.#animate()
      .then(this.#createController)
  }

  #animate = () => {
    const {fade, wrapper} = this.#view.refs

    return gsap.timeline({easy: 'none'})
      .to(fade, {alpha: 0, visible: false, duration: 1}, '<')
  }


  #createController = () => {
    this.#controller = new Controller(this.#game)
    this.#controller.init()
  }

  #initSignals = () => {
    this.#game.once('win', () => console.log('win'))
    this.#game.once('fail', () => console.log('fail'))
  }
}
