import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '@components/icons'
import { useHandlers } from '@/uibox'

import { defaultImages } from '@/constants/contants'

function Images() {
  const [search, setSearch] = useState('')
  const [images] = useState<any[]>(defaultImages)

  const handlers = useHandlers()

  const addImageToCanvas = url => {
    const options = {
      type: 'StaticImage',
      metadata: { src: url },
    }
    handlers.objectsHandler.create(options)
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={search}
          onChange={e => setSearch((e.target as any).value)}
          placeholder="Search components"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{
              display: 'grid',
              gap: '2rem',
              padding: '0 2rem 2rem',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
            }}
          >
            {images.map(img => (
              <div
                key={img.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onDragStart={e =>
                  handlers.dragAndDropHandler.onDragStart(e, {
                    type: 'StaticImage',
                    metadata: { src: img.previewURL },
                  })
                }
                onDragEnd={e => handlers.dragAndDropHandler.onDragEnd(e)}
                onClick={() => addImageToCanvas(img.previewURL)}
              >
                <img width="100%" src={img.previewURL} alt="preview" />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Images
