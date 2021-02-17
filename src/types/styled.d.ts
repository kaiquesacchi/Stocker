import "styled-components/native";

interface iPalette {
  main: string;
  contrastText: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    secondaryTextOpacity: string;
    palette: {
      primary: iPalette;
      secondary: iPalette;
      background: iPalette;
      focusBlock: iPalette;
    };
  }
}
