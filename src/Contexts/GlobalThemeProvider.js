import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const GlobalTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#444",
            main: "#333",
            dark: "#222",
            text: "#111",
        },
        grayScale: {
            100: "#1",
            200: "#2",
            300: "#3",
            400: "#4",
            500: "#5",
            600: "#6",
            700: "#7",
            800: "#8",
        }
    }
});

const GlobalThemeProvider = ({ children }) => (
  <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>
);

export default GlobalThemeProvider