import { useContext } from 'react'
import { EditorContext } from '../context'

export function useEditorContext() {
  const { setCanvas, canvas, activeObject, setActiveObject, zoomRatio, grid, setGrid } =
    useContext(EditorContext)

  return {
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    grid,
    setGrid,
  }
}
