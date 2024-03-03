import {createElement} from "../../../../Core/create.js";
/** @jsx createElement */
import {Sprite} from "pixi.js";

/**
 * Функция возвращает PIXI.Sprite c добавленным методом resize
 * <StyledSprite style={{...}} ref={(el)=>refs.sprite = el}>
 * стили можно изменить: refs.container.style = {...}
 * для ресайза: refs.container.resize()
 *
 * @return {Sprite}
 * @constructor
 */
export default function StyledSprite() {
  const style = {};
  const refs = {};
  const resize = () => {
    refs.root.classes = refs.root.style
  }

  return <Sprite ref={el=>refs.root=el}
                 style={style}
                 classes={style}
                 resize={() => resize()}
                 refs={refs}
  />
}
