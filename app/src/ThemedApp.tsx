import React from "react";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const theme = createMuiTheme(
  {
    direction: "rtl",
    palette: {
      primary: { main: "#342b40" },
      secondary: { main: "#7b1fa2" }
    },
    typography: {
      fontFamily: [
        "Assistant",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      h5: {
        fontWeight: 600
      },
      button: {
        textTransform: "none"
      }
    }
  },
  heIL
);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

type RTLProps = {
  children: any;
};

const RTL = (props: RTLProps) => {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
};

const ThemedApp = () => (
  <RTL>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RTL>
);

export default ThemedApp;
