

/* globals mraid */
const stores = {
  googlePlay: __GPLINK,
  appStore: __APPSTORELINK
}
const is_mraid = typeof mraid !== 'undefined';
const nav = navigator.userAgent || navigator.vendor || window.opera;
const ios = (/iPad|iPhone|iPod/.test(nav) || (/Intel Mac/.test(nav))) && !window.MSStream;

class MraidApi {

  get id() {
    return 'mraid'
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
    let link = stores.googlePlay
    if (ios) {
      link = stores.appStore
    }
    if (is_mraid) {
      mraid.open(link);
    } else {
      window.open(link, '_blank');
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

window.SERVICE = new MraidApi()

SERVICE.sayHello()

function showMyAd() {
  window.createGame()
}

if (is_mraid) {
  if (mraid.getState() === 'loading') {
    mraid.addEventListener('ready', showMyAd);
  } else {
    showMyAd();
  }
} else {
  showMyAd();
}
