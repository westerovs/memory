import {createElement, getTexture} from '../../../Core/create.js'
/** @jsx createElement */

import {Container, Sprite, TilingSprite} from 'pixi.js'
import {GAME_STYLES} from '../../styles.js'
import StyledSprite from '../../components/services/StyledSprite/StyledSprite.jsx'
import StyledContainer from '../../components/services/StyledContainer/StyledContainer.jsx'

export default function GameView(game) {
  const refs = {}

  const resize = () => {
    for (const key in refs) {
      if (refs[key].resize) refs[key].resize()
    }
  }


  const createBoard = () => [
    <StyledContainer x={200} y={200} ref={(el) => refs.board = el}/>
  ]

  const createWrapper = () => {
    return (
      <Container ref={(el) => refs.wrapper = el} sortableChildren={true}>
        <Sprite texture={'back'}/>

        {createBoard()}

        <Sprite ref={(el) => refs.fade = el} classes={GAME_STYLES.fade}/>
      </Container>
    )
  }

  return (
    <Container refs={refs} resize={() => resize()} sortableChildren={true} label={'GameView'}>
      {createWrapper()}

      <Sprite ref={(el) => refs.preload = el} texture={'preload'} visible={SERVICE.id !== 'mintegral'} zIndex={1000}/>
    </Container>
  )
}
