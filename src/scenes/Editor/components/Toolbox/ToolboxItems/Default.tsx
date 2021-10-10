import Icons from '../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import useAppContext from '@/hooks/useAppContext'
import { PanelType } from '@/constants/app-options'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Input } from 'baseui/input'
import { Checkbox } from 'baseui/checkbox'
import { useState } from 'react'
import { useEditorContext, useHandlers } from '@/sdk'

function Default() {
  const { grid } = useEditorContext()
  const [options, setOptions] = useState(grid)
  const [checked, setChecked] = useState(true)
  const handlers = useHandlers()
  const { setActivePanel } = useAppContext()

  const setGridSize = () => {
    handlers.gridHandler.update({
      ...options,
      gap: parseInt(options.gap as any),
    })
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <Button
        onClick={() => setActivePanel(PanelType.BACKGROUND)}
        size={SIZE.compact}
        kind={KIND.tertiary}
        shape={SHAPE.square}
      >
        <Icons.FillColor size={24} color="#000000" />
      </Button>

      <StatefulPopover
        placement={PLACEMENT.bottomRight}
        content={
          <div style={{ background: '#fff', width: '240px', padding: '2rem' }}>
            <Checkbox
              checked={checked}
              onChange={() => {
                handlers.gridHandler.toggle({ ...grid, enabled: !grid.enabled })
                setChecked(!checked)
              }}
            >
              Enabled
            </Checkbox>
            <div style={{ margin: '1rem 0' }}>
              <Input
                value={options.gap}
                onChange={e => setOptions({ ...options, gap: (e.target as any).value })}
              />
            </div>
            <Button onClick={() => setGridSize()}>Apply</Button>
          </div>
        }
        accessibilityType={'tooltip'}
      >
        <Button size={SIZE.compact} kind={KIND.tertiary} shape={SHAPE.square}>
          <Icons.Grid size={20} />
        </Button>
      </StatefulPopover>
    </div>
  )
}

export default Default
