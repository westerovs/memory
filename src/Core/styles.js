
export const createUseStyles  = (sheet) => {
  return new Proxy(sheet, {
    get: (target, property, receiver) => {
      const medias = getMedia(target).filter((media) => {
        if (!target[media].hasOwnProperty(property)) return false;
        return matchMedia(media).matches;
      });

      if (medias.length === 0) return target[property];
      return target[medias[medias.length-1]][property];
    }
  })
}

function getMedia(target) {
  const properties = Object.keys(target);
  const regex = new RegExp(/\(.*\)/);
  return properties.filter((property) => regex.test(property))
}
