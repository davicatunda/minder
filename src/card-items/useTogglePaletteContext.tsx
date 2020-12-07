import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider, createMuiTheme, useMediaQuery } from "@material-ui/core";
import { blue, green, orange, pink, red } from "@material-ui/core/colors";

const DEFAULT_THEME = {
  palette: {
    type: "light",
    primary: { main: blue[200] },
    secondary: { main: pink[200] },
    error: { main: red[500] },
    warning: { main: orange[500] },
    info: { main: blue[500] },
    success: { main: green[500] },
  },
  typography: {
    h1: {},
    h2: {},
  },
  props: {},
};

export function CustomThemeProvider({ children }: { children?: ReactNode }) {
  const [paletteType, togglePalette] = usePreferredPaletteType();
  const theme = useMemo(
    () =>
      createMuiTheme({
        ...DEFAULT_THEME,
        palette: { ...DEFAULT_THEME.palette, type: paletteType },
      }),
    [paletteType],
  );
  return (
    <ThemeProvider theme={theme}>
      <TogglePaletteContext.Provider value={{ togglePalette }}>
        {children}
      </TogglePaletteContext.Provider>
    </ThemeProvider>
  );
}

type TTogglePaletteContext = { togglePalette(): void };
const TogglePaletteContext = createContext<TTogglePaletteContext | null>(null);
export function useTogglePaletteContext() {
  const context = useContext(TogglePaletteContext);
  if (context == null) {
    throw new Error("missing TogglePaletteContext.Provider");
  }
  return context;
}

function usePreferredPaletteType(): ["dark" | "light", () => void] {
  const devicePalette = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const [palette, setPalette] = useState(localStorage.getItem("palette"));

  const togglePalette = useCallback(() => {
    setPalette((current) => {
      const opposite = current === "dark" ? "light" : "dark";
      localStorage.setItem("palette", opposite);
      return opposite;
    });
  }, []);
  switch (palette) {
    case "dark":
      return ["dark", togglePalette];
    case "light":
      return ["light", togglePalette];
    default:
      return [devicePalette, togglePalette];
  }
}
