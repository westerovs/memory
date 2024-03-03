import {gsap} from 'gsap'

export default class Timer {

  #game = window._game
  #timer = null
  #clockTimer = null
  #initSecond = null
  #clockSeconds = null

  constructor(props) {
    this.#initSecond = props.seconds
    this.#clockSeconds = props.seconds
    this.#timer = this

    this.#game.app.stage.interactive = true
    this.#game.app.stage.hitArea = this.#game.app.screen
    this.#game.app.stage.on('pointerdown', this.#resetTimer)

    this.#game.on('win', this.destroy)
    this.#game.on('fail', this.destroy)

    this.#init()
  }

  get currentTime() {
    return this.#clockSeconds
  }

  destroy = () => {
    console.log('timer destroy')
    this.#stopTimer()
    this.#game.app.stage.off('pointerdown', this.#resetTimer)
  }

  #init = () => {
    this.#createTimer()
  }

  #stopTimer = () => {
    if (this.#clockTimer) {
      this.#clockTimer.kill()
    }
  }

  #createTimer = () => {
    this.#clockTimer = gsap.to({}, {duration: 1, repeat: this.#clockSeconds})
      .eventCallback('onRepeat', () => this.#tick())
  }

  #tick = () => {
    this.#clockSeconds--
    console.log(this.#clockSeconds)
    this.#game.emit('updateTimer', this.#clockSeconds)
  }

  #resetTimer = () => {
    console.log('resetTimer')
    this.#stopTimer()
    this.#clockSeconds = this.#initSecond
    this.#createTimer()
  }
}
