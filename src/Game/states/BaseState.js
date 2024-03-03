export default class BaseState {

  get initEventName() {
    return 'state:basestate'
  }

  constructor(game) {
    this.initialized = false

    this.game = game
    this.game.on(this.initEventName, () => {
      if (this.initialized) return
      this.initialize()
    })
  }

  initialize() {
  }

  update() {
  }

  resize() {
  }

  terminate() {
  }
}
