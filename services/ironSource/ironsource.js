class IronSourceApi {

  get id() {
    return 'ironsource'
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
    dapi.openStoreUrl()
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

window.SERVICE = new IronSourceApi()

window.addEventListener('load', () => {
  (dapi.isReady()) ? onReadyCallback() : dapi.addEventListener('ready', onReadyCallback)
})


function onReadyCallback() {
  dapi.removeEventListener('ready', onReadyCallback)
  const volume = dapi.getAudioVolume()

  if (dapi.isViewable()) {
    gameStart()
  }

  dapi.addEventListener('viewableChange', (e) => viewableChangeCallback(e))
  dapi.addEventListener('audioVolumeChange', volumeChangeCallback)
  dapi.addEventListener('adResized', adResizeCallback)
  volumeChangeCallback()
  adResizeCallback()

  let screenSize = dapi.getScreenSize()
}

function adResizeCallback() {
  const screenSize = dapi.getScreenSize()
}

function volumeChangeCallback(volume) {

}

function viewableChangeCallback(e) {
  console.log('GAME viewableChangeCallback', e)
  if (window.game) return
  if (dapi.isViewable()) {
    gameStart()
  }
}

function gameStart() {
  window.createGame()
  window.game = true
}
