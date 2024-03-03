
class Service {

  get id() {
    return 'devService'
  }

  sayHello() {
    console.log(`Hello ${this.id}`)
  }

  isCtaVisible() {
    return true
  }

  isCloseVisible() {
    return true
  }

  handleClickOnClose() {
    console.log(`${this.id}: click on close button `)
  }

  handleClickOnCta() {
    console.log(`${this.id}: click on close button `)
  }

  handleWinGame() {
    console.log(`${this.id}: win game `)
  }

  handleFailGame() {
    console.log(`${this.id}: fail game `)
  }

  handleComplete() {
    console.log(`${this.id}: complete game `)
  }
}

window.SERVICE = new Service()

window.addEventListener('load', () => {
  if (window.createGame) {
    window.createGame();
  }
})
