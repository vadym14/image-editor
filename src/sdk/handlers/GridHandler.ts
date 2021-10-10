import { fabric } from 'fabric'
import { GridOption, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'
import throttle from 'lodash/throttle'

class GridHandler extends BaseHandler {
  options: GridOption
  grid: fabric.Group

  constructor(props: HandlerOptions) {
    super(props)
    this.options = this.context.grid
    this.initialize()
  }

  /**
   * Init grid
   *
   */
  public initialize = () => {
    this.draw()
    this.initListeners()
  }

  public initListeners = () => {
    const { gap } = this.options
    const frame = this.root.frameHandler.get()

    const originX = frame.left
    const originY = frame.top

    this.canvas.on('object:moving', event => {
      const { target } = event
      if (target.top > originY) {
        if ((target.top - originY) % gap < 10) {
          target.set({
            top: target.top - ((target.top - originY) % gap),
          })
        }
      }

      if (target.left > originX) {
        if ((target.left - originX) % gap < 10) {
          target.set({
            left: target.left - ((target.left - originX) % gap),
          })
        }
      }
    })
  }

  public toggle(options) {
    this.options = Object.assign(this.options, options)
    if (this.options.enabled) {
      this.add()
    } else {
      this.remove()
    }
    this.context.setGrid(options)
  }

  public update = throttle(options => {
    this.options = Object.assign(this.options, options)
    if (this.options.enabled) {
      this.add()
    } else {
      this.remove()
    }
    this.context.setGrid(options)
  }, 500)

  public add() {
    if (this.grid) {
      this.remove()
    }
    this.draw()
  }

  public remove() {
    if (this.grid) {
      this.canvas.remove(this.grid)
      this.grid = null
    }
  }

  public draw = () => {
    if (this.grid) {
      this.remove()
    }
    const { lineColor, borderColor, gap } = this.options
    const gridGroupOpts = new fabric.Group(null, {
      excludeFromExport: true,
      evented: false,
      selectable: false,
      hoverCursor: 'default',
    })

    const lineOptions = {
      stroke: lineColor,
      selectable: false,
      evented: false,
      id: 'grid',
      scalingFactor: 1,
    }
    const gridGroup = new fabric.Group(null, gridGroupOpts)

    const frame = this.root.frameHandler.get()
    const { width, height } = frame.getBoundingRect()

    // Draw horizontal lines
    const totalHorizontalLines = height / gap
    for (let i = 0; i < totalHorizontalLines; i++) {
      const distance = i * gap
      const horizontal = new fabric.Line([0, distance, width, distance], lineOptions)
      gridGroup.addWithUpdate(horizontal)
    }

    // Draw vertical lines
    const totalVerticalLines = width / gap
    for (let j = 0; j < totalVerticalLines; j++) {
      const distance = j * gap
      const vertical = new fabric.Line([distance, 0, distance, height], lineOptions)
      if (j % 5 === 0) {
        vertical.set({ stroke: borderColor })
      }
      gridGroup.addWithUpdate(vertical)
    }
    this.canvas.add(gridGroup)
    gridGroup.set({
      top: frame.top,
      left: frame.left,
    })
    this.grid = gridGroup
    gridGroup.moveTo(1)
  }
}

export default GridHandler
