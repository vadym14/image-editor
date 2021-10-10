import { ObjectType } from '../common/constants'
import { fabric } from 'fabric'

class ObjectToFabric {
  async run(item: any): Promise<fabric.Object> {
    let object
    switch (item.type) {
      case ObjectType.STATIC_TEXT:
        object = await this[ObjectType.STATIC_TEXT](item)
        break
      case ObjectType.STATIC_IMAGE:
        object = await this[ObjectType.STATIC_IMAGE](item)
        break
      case ObjectType.STATIC_VECTOR:
        object = await this[ObjectType.STATIC_VECTOR](item)
        break
      case ObjectType.STATIC_PATH:
        object = await this[ObjectType.STATIC_PATH](item)
        break
    }
    return object as fabric.Object
  }

  [ObjectType.STATIC_TEXT](item: any) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const metadata = item.metadata
        const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineheight, text } = metadata
        const textOptions = {
          ...baseOptions,
          text: text ? text : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize: fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
        }
        const element = new fabric.StaticText(textOptions)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_IMAGE](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const src = item.metadata.src
        fabric.Image.fromURL(
          src,
          function (image) {
            image.set(baseOptions)
            resolve(image)
          },
          {
            crossOrigin: 'Anonymous',
          }
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_PATH](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const value = item.metadata.value
        const element = new fabric.Path(value, baseOptions)
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_VECTOR](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const src = item.metadata.src
        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height } = baseOptions
          if (!width || !height) {
            baseOptions.width = opts.width
            baseOptions.height = opts.height
          }
          const object = new fabric.StaticVector(objects, opts, {
            ...baseOptions,
            src,
          })

          resolve(object)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getBaseOptions(item: any) {
    const { left, top, width, height, scaleX, scaleY } = item
    let metadata = item.metadata ? item.metadata : {}
    const { fill, angle, originX, originY } = metadata
    let baseOptions = {
      angle: angle ? angle : 0,
      top: top,
      left: left,
      width: width,
      height: height,
      originX: originX || 'left',
      originY: originY || 'top',
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || '#000000',
      metadata: metadata,
    }
    return baseOptions
  }
}

export default new ObjectToFabric()
