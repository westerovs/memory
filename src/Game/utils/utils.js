/** @jsx createElement */
import {BitmapFont, BitmapText} from 'pixi.js'
import {createElement, getTexture} from '../../Core/create.js'
import {BITMAP_FONTS} from '../assetsLists/bitmapFonts.js'
import {gsap} from 'gsap'

const createBitmapFont = (textName, initText = '', x = 0, y = 0) => {
  BitmapFont.install(BITMAP_FONTS[textName], getTexture(textName))
  const font = new BitmapText(initText, {fontName: textName})
  font.anchor.set(0.5)
  font.x = x
  font.y = y

  return font
}

// for collision
const testForAABB = (object1, object2) => {
  const bounds1 = object1.getBounds()
  const bounds2 = object2.getBounds()

  return bounds1.x < bounds2.x + bounds2.width
    && bounds1.x + bounds1.width > bounds2.x
    && bounds1.y < bounds2.y + bounds2.height
    && bounds1.y + bounds1.height > bounds2.y
}

const clearTimeLine = (timeLine) => {
  if (timeLine) {
    timeLine.progress(0) // Перематываем анимацию к начальному состоянию
    timeLine.kill() // Остановить текущую анимацию
    timeLine.clear() // Очистить таймлайн
  }
}

export {
  createBitmapFont,
  testForAABB,
  clearTimeLine,
}
