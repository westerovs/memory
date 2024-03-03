import {Container, Graphics, Text} from "pixi.js";

export default class Viewport extends Container {
  constructor(game, width, height) {
    super();
    this.originalWidth = width;
    this.originalHeight = height;
    this.game = game
    this.bounds = new Graphics()
    this.info = new Text({ text: 'info:', style: { fill: 0xff0000 } })
    // this.addChild(this.bounds);
    // this.addChild(this.info)
    this.sortableChildren = true
  }

  resize() {
    this.drawBounds()
    this.bounds.zIndex = 0
    this.game.app.canvas.style.transform = `translate(-50%, -50%) scale(${this.getScaleFactor()+0.005})`
    this.bounds.x = this.game.app.renderer.width / 2
    this.bounds.y = this.game.app.renderer.height / 2
    this.info.text = `
    screen: [${screen.width}, ${screen.height}]
    screenAv: [${screen.availWidth}, ${screen.availHeight}]
    body:   [${document.body.getBoundingClientRect().width}, ${document.body.getBoundingClientRect().height}]
    window:   [${window.innerWidth}, ${window.innerHeight}]
    factor: [${this.getScaleFactor() }]
    landscape: ${this.isLandscape}
    `
  }

  drawBounds() {
    this.bounds.clear()
    this.bounds.setStrokeStyle([4, 0xff0000, 1, 0])
    this.bounds.rect(...this.isLandscape ?
      [-this.originalWidth / 2, -this.originalHeight / 2, this.originalWidth, this.originalHeight] :
      [-this.originalHeight / 2, -this.originalWidth / 2,this.originalHeight, this.originalWidth]
    )
    this.bounds.circle(0, 0, 10)
  }

  getAspectRatio() {
    const sWidth = document.body.clientWidth
    const sHeight = document.body.clientHeight

    if (sWidth === sHeight) return sWidth / this.originalWidth;

    const width = this.isLandscape ? Math.max(sWidth, sHeight) : Math.min(sWidth, sHeight)
    const height = this.isLandscape ? Math.min(sWidth, sHeight) : Math.max(sWidth, sHeight)

    return  width / height
  }

  getScaleFactor() {
    const width = window.innerWidth
    const height = window.innerHeight

    if(!this.isLandscape)
      return Math.min(height / this.originalWidth, width / this.originalHeight);

    return Math.min(width / this.originalWidth, height / this.originalHeight);
  }

  get isLandscape() {
    return matchMedia('(orientation: landscape)').matches
  }
}
