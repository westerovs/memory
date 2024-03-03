import * as PIXI from 'pixi.js';
import BaseState from "../BaseState.js";

export default class PreloadState extends BaseState{

  get initEventName() {
    return 'state:preloadstate'
  }

  async initialize() {
    this.assets = PIXI.Assets
    await this.assets.load([...window.preloadAssets, ...window.localeAssets])
    this.initialized = true
    await this.assets.load([...window.gameAssets])
    this.game.emit('state:gamestate')
  }

  resize() {

  }

  terminate() {
    this.initialized = false;
    this.view.destroy();
    this.view = null;
  }
}
