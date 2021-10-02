import React from 'react'
import BaseHandler from './BaseHandler'

class DragAndDropHandler extends BaseHandler {
  item: any
  constructor(props) {
    super(props)
    this.init()
  }
  init = () => {
    this.canvas.wrapperEl.addEventListener('dragenter', this.onDragEnter, false)
    this.canvas.wrapperEl.addEventListener('dragover', this.onDragOver, false)
    this.canvas.wrapperEl.addEventListener('dragleave', this.onDragLeave, false)
    this.canvas.wrapperEl.addEventListener('drop', this.onDrop, false)
  }
  destroy = () => {
    this.canvas.wrapperEl.removeEventListener('dragenter', this.onDragEnter)
    this.canvas.wrapperEl.removeEventListener('dragover', this.onDragOver)
    this.canvas.wrapperEl.removeEventListener('dragleave', this.onDragLeave)
    this.canvas.wrapperEl.removeEventListener('drop', this.onDrop)
  }

  onDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    this.item = item
  }

  onDrop = (e: DragEvent) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    // @ts-ignore
    const { layerX, layerY } = e
    const vt = this.canvas.viewportTransform
    if (this.item) {
      this.root.objectsHandler.create({
        ...this.item,
        top: layerY / vt[0] - vt[5] / vt[0],
        left: layerX / vt[0] - vt[4] / vt[0],
        absoluteCoords: true,
      })
    }
  }

  onDragEnter = (e: DragEvent) => {}

  onDragOver = e => {
    e.preventDefault()
  }

  onDragLeave = (e: DragEvent) => {
    e.preventDefault()
  }

  onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    this.item = null
  }
}

export default DragAndDropHandler
