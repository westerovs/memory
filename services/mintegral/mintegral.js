
class MintegralApi {

  get id() {
    return 'mintegral'
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
    if (window.gameEnd) {
      window.gameEnd()
    }
  }

  handleClickOnCta() {
    if (window.install) {
      window.install()
    } else {
      console.error('CTA event is undefined')
    }
  }

  handleWinGame() {
    console.log(`${this.id}: win game `)
  }

  handleFailGame() {
    console.log(`${this.id}: fail game `)
  }
}

window.SERVICE = new MintegralApi()


window.addEventListener('load', () => {
    if (window.gameReady) {
      window.gameReady()
    }
})
