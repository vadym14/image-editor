import { fabric } from 'fabric'
// import { SCALE_FACTOR, ObjectType } from '../common/constants'
import BaseHandler from './BaseHandler'
// import { loadImageFromURL } from '../utils/image-loader'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'

class FrameHandler extends BaseHandler {
  frame
  options
  sizeFormat
  backgroundimage

  constructor(props: HandlerOptions) {
    super(props)
    // this.options = defaultFrameOptions
    this.initialize()
  }

  initialize() {
    const frame = new fabric.Frame({
      width: 1280,
      height: 720,
      id: '',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
    })
    this.canvas.add(frame)
    frame.center()
    const interval = setInterval(() => {
      if (this.root.scrollbarHandler && this.root.scrollbarHandler.updateScrollPosition) {
        this.root.scrollbarHandler.updateScrollPosition()
        clearInterval(interval)
      }
    }, 100)
  }

  get = () => {
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }

  update = options => {
    // this.sizeFormat = options
    // const frame = this.get()
    // const { width, height } = this.scaleDimension(this.sizeFormat)
    // this.options = Object.assign(this.options, { width, height, isPortrait: options.isPortrait })
    // frame.set('width', width)
    // frame.set('height', height)
    // frame.center()
    // this.context.setSizeFormat(options)
    // this.root.transactionHandler.save('frame:update')
    // this.root.gridHandler.draw()
  }

  setBackgroundColor = (color: string) => {
    const frame = this.get()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  setBackgroundImageURL = async url => {
    // this.removeBackgroundImage()
    // const frame = this.get()
    // const image = await loadImageFromURL(url)
    // const element = new fabric.BackgroundImage(image)
    // element.clipPath = frame
    // element.scaleToWidth(frame.width)
    // this.canvas.add(element)
    // element.center()
    // element.moveTo(1)
  }

  create = options => {
    // const shadow = new fabric.Shadow({
    //   color: '#afafaf',
    //   blur: 2.5,
    // })
    // this.sizeFormat = options
    // const scaledSize = this.scaleDimension(this.sizeFormat)
    // const frame = new fabric.Frame({ ...defaultFrameOptions, ...scaledSize, shadow })
    // this.canvas.add(frame)
    // frame.center()
    // this.options = Object.assign(this.options, scaledSize)
    // this.context.setSizeFormat(options)
  }

  getBackgroundImage = () => {
    // return this.canvas.getObjects().find(object => object.type === 'BackgroundImage')
  }

  removeBackgroundImage = () => {
    // const backgroundImage = this.getBackgroundImage()
    // if (backgroundImage) {
    //   this.canvas.remove(backgroundImage)
    // }
  }

  reset = () => {
    // const frame = this.get()
    // frame.set('fill', defaultFrameOptions.fill)
  }

  setSelectionBorder = () => {
    // const frame = this.root.frameHandler.get()
    // frame.setSelectionBorder()
  }

  getOptions = (): FrameOptions => {
    const frame = this.get()
    return frame.toJSON(this.root.propertiesToInclude)
  }

  scaleDimension = options => {
    // const { pixelHeight, pixelWidth, isPortrait } = options
    // const height = isPortrait ? pixelHeight * SCALE_FACTOR : pixelWidth * SCALE_FACTOR
    // const width = isPortrait ? pixelWidth * SCALE_FACTOR : pixelHeight * SCALE_FACTOR
    // return {
    //   height,
    //   width,
    // }
  }

  getFitRatio = () => {
    const canvasWidth = this.canvas.getWidth() - 180
    const canvasHeight = this.canvas.getHeight() - 180
    const options = this.getOptions()
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}

export default FrameHandler
