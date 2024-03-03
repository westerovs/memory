
class MolocoApi {

  get id() {
    return 'moloco'
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

  handleComplete() {
    console.log(`${this.id}: complete`)
  }

  handleClickOnCta() {
    FbPlayableAd.onCTAClick()
  }

  handleWinGame() {
    console.log(`${this.id}: win game `)
  }

  handleFailGame() {
    console.log(`${this.id}: fail game `)
  }
}

window.SERVICE = new MolocoApi()


window.addEventListener('load', () => {
  if (window.createGame) {
    window.createGame();
  }
})
