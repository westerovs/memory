import {Texture} from 'pixi.js'
import {createUseStyles} from '../Core/styles.js'

export const GAME_STYLES = {
  fade: {
    texture: Texture.WHITE,
    width: 1366,
    height: 1366,
    tint: 0,
    alpha: 0.7
  },

  island: createUseStyles({
    x: 500,
    y: 500,
    '(orientation: landscape)': {
      x: 500,
      y: 500,
    }
  }),
}
