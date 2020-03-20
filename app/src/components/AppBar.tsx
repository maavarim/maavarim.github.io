import React from "react";
import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
  Box
} from "@material-ui/core";
import LogoJpeg from "../img/Logo.jpeg";

const useStyles = makeStyles(theme => ({
  appBarTitle: {
    flexGrow: 1
  },
  logoImage: {
    height: "3em"
  },
  profilePhoto: {
    height: "2em",
    borderRadius: "50%",
    marginInlineEnd: `${theme.spacing(1)}px`
  }
}));

interface AppBarProps {
  title: string;
  buttons: JSX.Element;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

function AppBar({ title, buttons, position }: AppBarProps) {
  const classes = useStyles();

  return (
    <MuiAppBar position={position ?? "static"}>
      <Toolbar>
        <Container maxWidth="md">
          <Box display="flex" alignItems="center">
            <img src={LogoJpeg} className={classes.logoImage} alt="logo" />
            <Typography variant="h6" className={classes.appBarTitle}>
              {title}
            </Typography>
            {buttons}
          </Box>
        </Container>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
