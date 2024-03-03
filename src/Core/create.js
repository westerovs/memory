import * as PIXI from 'pixi.js';

export const createElement = (displayObject, props, ...children) => {
  let obj = null;

  if (!(displayObject.prototype instanceof PIXI.EventEmitter)) {
    obj = new displayObject(props)
  } else if (displayObject === PIXI.AnimatedSprite) {
    obj = new displayObject([PIXI.Texture.EMPTY]);
  } else {
    obj = new displayObject();
  }

  if (props && props.ref) props.ref(obj);
  children.forEach(child => addChild(obj, child));
  obj.once('added', () => {
    if (props) setProps(obj, props);
  })
  return obj
}

export const addChild = (parent, children) => {
  if (Array.isArray(children))
    children.forEach(nestedChild => {
      addChild(parent, nestedChild)
    });

  else {
    parent.addChild(children)
  }
};

export function setProps(object, props) {
  Object.keys(props).forEach(property => {
    if (property === 'texture') {
      object.texture = getTexture(props.texture);
      return;
    }
    if (property === 'textures') {
      object.textures = getTextures(props.textures)
      return;
    }
    if (property === 'classes') {
      applyClasses(object, props)
      return;
    }
    if (property === 'position') {
      object.position.set(...props.position)
      return;
    }
    object[property] = props[property]
  })
}

export function getTexture(texture) {
  try {
    if (typeof texture === 'string') {
      return  PIXI.Assets.get(texture) ?? PIXI.Texture.EMPTY
    }
    if (texture instanceof PIXI.Texture) {
      return texture;
    }
    return PIXI.Texture.WHITE
  } catch (e) {
    console.log(texture, e)
  }
}

export function getTextures(textures) {
  return textures.map((texture) => getTexture(texture))
}

export function applyClasses(object, props) {
  if (!object.classes) {
    Object.defineProperty(object, 'classes', {
      get: () => object._classes,
      set: (value) => {
        if (!object._classes) object._classes = {};
        // if (object.name && (object.name==='doll' || object.name==='dollAfter')) {
        //   console.log(object.name, object._classes, value)
        // }
        Object.assign(object._classes, value);
        const classes = {}
        for (const key in object._classes) {
          if (typeof object._classes[key] === 'function') {
            classes[key] = object._classes[key]();
          } else {
            classes[key] = object._classes[key];
          }
        }
        setProps(object, classes)
      }
    })
  }
  object.classes = props.classes
}
