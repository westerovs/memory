
class VungleApi {

  get id() {
    return 'vungle'
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
    setTimeout(function(){
      parent.postMessage('complete','*');
    }, 2000);
  }

  handleClickOnCta() {
    parent.postMessage('download','*');
  }

  handleWinGame() {
    console.log(`${this.id}: win game `)
  }

  handleFailGame() {
    console.log(`${this.id}: fail game `)
  }
}

window.SERVICE = new VungleApi()

window.addEventListener('DOMContentLoaded', () => {
  if (window.createGame) {
    window.createGame();
  }
})
