import { FC, createContext, useState } from 'react'
import { fabric } from 'fabric'
import Handlers from '../handlers'
import { GridOption } from '../common/interfaces'
import { gridOption } from '../common/constants'

export interface IEditorContext {
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
  handlers: Handlers | null
  setHandlers: (handlers: Handlers) => void
  zoomRatio: number
  setZoomRatio: (value: number) => void
  grid: GridOption
  setGrid: (value: GridOption) => void
}

export const EditorContext = createContext<IEditorContext>({
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  handlers: null,
  setHandlers: () => {},
  zoomRatio: 1,
  setZoomRatio: () => {},
  grid: gridOption,
  setGrid: () => {},
})

export const EditorProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [handlers, setHandlers] = useState<Handlers | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [grid, setGrid] = useState(gridOption)

  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    handlers,
    setHandlers,
    zoomRatio,
    setZoomRatio,
    grid,
    setGrid,
  }

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
}
