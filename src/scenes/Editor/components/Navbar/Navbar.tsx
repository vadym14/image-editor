import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Button, KIND } from "baseui/button";
import Logo from "@components/icons/Logo";
import { useHandlers } from "@/uibox";
import api from "@/services/api";

const Container = styled("div", (props) => ({
  height: "70px",
  background: props.$theme.colors.background,
  display: "flex",
  padding: "0 2rem",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LogoContainer = styled("div", (props) => ({
  color: props.$theme.colors.primary,
  display: "flex",
  alignItems: "center",
}));

function NavbarEditor() {
  const handlers = useHandlers();

  const toDataURL = (url: string) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };
  const downloadImage = async () => {
    if (handlers) {
      const template = handlers.templateHandler.exportTemplate();
      const image = await api.downloadTemplate(template);
      const a = document.createElement("a");
      a.href = await toDataURL(image.source);

      a.download = "drawing.png";
      a.click();
    }
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: "flex", gap: "1rem" }}>
          <LogoContainer>
            <Logo size={40} />
          </LogoContainer>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Button onClick={downloadImage} kind={KIND.primary}>
            Download
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default NavbarEditor;
