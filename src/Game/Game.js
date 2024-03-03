import * as PIXI from 'pixi.js';
import Viewport from "../Core/Viewport.js";
import {Application, autoDetectRenderer, EventEmitter} from "pixi.js";

export default class Game extends EventEmitter{
  constructor() {
    super();
    this.init()
  }

  async init() {
    this.states = []

    this.app = new Application()
    await this.app.init({width: 1366, height: 1366})

    this.app.canvas.className = 'pixi-view'
    document.body.querySelector('#canvas-wrapper').appendChild(this.app.canvas)

    this.viewport = new Viewport(this, 1366, 584)
    this.app.stage.addChild(this.viewport)

    window.addEventListener('resize', () => this.handleResize());

    this.app.ticker.add(this.update, this);

    this.handleResize();
  }

  handleResize() {
    setTimeout(() => {
      this.viewport.resize()
      this.states.forEach((state) => {
        if (!state.initialized) return;
        state.resize();
      })
    }, 50)
  }

  update() {
    this.states.forEach((state) => {
      if (!state.initialized) return;
      state.update(this.app.ticker.elapsedMS);
    })
  }

  start() {
    this.emit('state:preloadstate')
  }
}
