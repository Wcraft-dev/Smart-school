import React, { useMemo } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  useMediaQuery,
} from "@material-ui/core";
import App from "../App";

export default function Themex() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            light: "#534bae",
            main: "#1a237e",
            dark: "#000051",
          },
          secondary: {
            light: "#7a7cff",
            main: "#304ffe",
            dark: "#0026ca",
          },
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
