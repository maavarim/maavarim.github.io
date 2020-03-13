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
      primary: { main: "#8e24aa" }
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
      ].join(",")
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
