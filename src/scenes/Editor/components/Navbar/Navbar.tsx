import { styled, ThemeProvider, DarkTheme } from 'baseui'
import { Button, KIND } from 'baseui/button'
import Logo from '@components/icons/Logo'
import { useHandlers, DesignManager } from '@/sdk'

const Container = styled('div', props => ({
  height: '70px',
  background: props.$theme.colors.background,
  display: 'flex',
  padding: '0 2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const LogoContainer = styled('div', props => ({
  color: props.$theme.colors.primary,
  display: 'flex',
  alignItems: 'center',
}))

function NavbarEditor() {
  const handlers = useHandlers()

  const downloadImage = async () => {
    if (handlers) {
      const template: any = handlers.templateHandler.exportTemplate()
      const designManager = new DesignManager(template)
      await designManager.loadTemplate()
      const data = await designManager.toDataURL()
      if (data) {
        const a = document.createElement('a')
        a.href = data
        a.download = 'drawing.png'
        a.click()
      }
    }
  }

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <LogoContainer>
            <Logo size={40} />
          </LogoContainer>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={downloadImage} kind={KIND.primary}>
            Download
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default NavbarEditor
