class G5MMGService {

  constructor() {
    window.G5EscriptVersion = `[G5MMG] tht: ML0004v002 (en)`
  }

  _createCloseBtn() {
    let src = window.preloadAssets.find(item => item.name === 'close')
    if (!src) {
      console.warn('close.png isn`t found. Put the picture to static/assets/preload')
      return;
    }
    const img = new Image(40, 40);
    img.src = src.url;
    img.style.position = 'absolute';
    img.style.zIndex = '1000';
    img.style.top = '10px';
    img.style.right = '10px';
    document.body.appendChild(img)
    img.addEventListener('click', () => {
      this.handleClickOnClose()
    })

    this.closeButton = img
  }

  hideCloseButton() {
    this.closeButton.style.display = 'none';
  }

  showCloseButton() {
    this.closeButton.style.display = 'block';
  }

  get id() {
    return 'G5MMG'
  }

  sayHello() {
    console.log(`Hello ${this.id}`)
  }

  isCtaVisible() {
    return false
  }

  isCloseVisible() {
    return true
  }

  handleClickOnClose() {
    if (!window.g5mmg) {
      this.handleSkipGame();
      return
    }
    if (!window.g5mmg.placement) {
      this.handleSkipGame();
      return;
    }
    if (window.g5mmg.placement === 'mmgAuto') {
      this.handleSkipGame()
    } else {
      this.handleFailGame()
    }
  }

  handleClickOnCta() {
    console.log(`${this.id}: click on close button `)
    this.sendMessage('skip')
  }

  handleWinGame() {
    this.sendMessage('win')
  }

  handleSkipGame() {
    this.sendMessage('skip')
  }

  handleFailGame() {
    this.sendMessage('fail')
  }

  handleComplete() {

  }

  sendMessage(message) {
    this.g5Click(`g5action:${message}`)

    setTimeout(() => {
      this.g5Click('ui:closetimer')

      setTimeout(() => {
        this.g5Click('ui:close')
      }, 10)
    }, 10)

    return false
  }

  g5Click(link) {
    if (window.external && 'notify' in window.external) {
      window.external.notify(link)
    } else {
      const node = document.createElement('a')
      node.href = link
      document.querySelector('body').appendChild(node)
      if (document.createEvent) {
        const evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, false)
        node.dispatchEvent(evt)
      } else if (document.createEventObject) {
        node.fireEvent('onclick')
      } else if (typeof node.onclick === 'function') {
        node.onclick()
      }
    }
  }

  destroyGame() {
    if ('messageTimer' in window && window.messageTimer) {
      if (Object.prototype.hasOwnProperty.call(window.messageTimer, 'intervalID') && window.messageTimer.intervalID) {
        clearInterval(window.messageTimer.intervalID)
      }
      if (Object.prototype.hasOwnProperty.call(window.messageTimer, 'clearTimer')) {
        window.messageTimer.clearTimer()
      }
      delete window.messageTimer
    }
    if (window.Game && typeof window.Game === 'object' && !window.messageClosed) {
      window.messageClosed = true
      setTimeout(() => {
        try {
          Game.gsap.ticker.sleep()
          document.querySelector('.pixi-view').remove()
        } catch (e) {
          console.log('destroyGame', e)
        }
      }, 50)
    }
  }
}

window.SERVICE = new G5MMGService()

window.addEventListener('load', () => {
  document.body.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    return false
  })
  window.SERVICE._createCloseBtn()
  if (window.createGame) {
    window.createGame();
  }
})
