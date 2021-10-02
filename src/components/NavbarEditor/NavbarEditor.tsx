import { styled, ThemeProvider, DarkTheme } from 'baseui'
import { Button, KIND } from 'baseui/button'
import Logo from '@components/icons/Logo'

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
  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <LogoContainer>
          <Logo size={40} />
        </LogoContainer>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button kind={KIND.tertiary}>Save</Button>
          <Button kind={KIND.secondary}>Share</Button>
          <Button kind={KIND.primary}>Download</Button>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default NavbarEditor
