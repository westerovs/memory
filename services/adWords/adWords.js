
class AdwordsApi {

  get id() {
    return 'adwords'
  }

  sayHello() {
    console.log(`Hello ${this.id}`)
  }

  isCtaVisible() {
    return true
  }

  isCloseVisible() {
    return false
  }

  handleClickOnClose() {
    console.log(`${this.id}: click on close button `)
  }

  handleClickOnCta() {
    if (ExitApi) {
      ExitApi.exit(5);
    }
  }

  handleComplete() {
    console.log(`${this.id}: complete`)
  }

  handleWinGame() {
    console.log(`${this.id}: win game `)
  }

  handleFailGame() {
    console.log(`${this.id}: fail game `)
  }
}

function initClose() {
  if (ExitApi) {
    ExitApi.delayCloseButton(5);
  }
}

window.SERVICE = new AdwordsApi()

window.addEventListener('load', () => {
  if (window.createGame) {
    window.createGame();
  }
})
