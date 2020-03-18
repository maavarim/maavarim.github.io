import React from "react";
import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Box
} from "@material-ui/core";
import LogoJpeg from "../img/Logo.jpeg";

const useStyles = makeStyles({
  appBarTitle: {
    flexGrow: 1
  },
  logoImage: {
    height: "3em"
  }
});

function AppBar() {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Box display="flex" alignItems="center">
            <img src={LogoJpeg} className={classes.logoImage} alt="logo" />
            <Typography variant="h6" className={classes.appBarTitle}>
              מעברים – חיפוש אנשי.ות מקצוע
            </Typography>
            <Button color="inherit">התחברות</Button>
          </Box>
        </Container>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
