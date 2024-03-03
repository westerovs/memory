import * as PIXI from "pixi.js";

export class Loader extends PIXI.utils.EventEmitter {
  constructor() {
    super();
    this.resources = {}
    this._progressHandlers = []
    this.onProgress = {
      add: (callback) => {
        this._progressHandlers.push(callback)
      }
    }
  }

  add(list) {
    list.forEach((item) => {
      const img = new Image();
      img.src = item.url;
      this.resources[item.name] =  {texture: new PIXI.Texture(PIXI.BaseTexture.from(img))}
    })
    return this
  }

  load(callback) {
    callback(this)
  }

  static shared = new Loader()
}
