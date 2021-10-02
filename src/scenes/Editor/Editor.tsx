import useAppContext from '@/hooks/useAppContext'
import api from '@/services/api'
import { useEffect } from 'react'
import EditorCanvas from './components/EditorCanvas'
import Navbar from './components/Navbar'
import Panels from './components/Panels'
import Toolbox from './components/Toolbox'
import Footer from './components/Footer'

function App() {
  const { setTemplates, setShapes } = useAppContext()

  useEffect(() => {
    api.getTemplates().then(templates => setTemplates(templates))
    api.getShapes().then(shapes => setShapes(shapes))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F9F9F9',
        fontFamily: 'Uber Move Text',
      }}
    >
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Panels />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Toolbox />
          <EditorCanvas />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
