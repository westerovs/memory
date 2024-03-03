import {createElement} from "../../../../Core/create.js"
/** @jsx createElement */
import {Container} from "pixi.js"

/**
 * Функция возвращает PIXI.Container c добавленным методом resize
 * <StyledContainer style={{...}} ref={(el)=>refs.container = el}>
 * стили можно изменить: refs.sprite.style = {...}
 * для ресайза: refs.container.resize()
 *
 * @return {Container}
 * @constructor
 */
export default function StyledContainer() {
  const style = {}
  const refs = {}
  const resize = () => {
    refs.root.classes = refs.root.style
  }

  return <Container ref={el => refs.root = el}
                    style={style}
                    classes={style}
                    resize={() => resize()}
                    refs={refs}
  />
}
