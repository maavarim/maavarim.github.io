import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";

import { DrawerAction, Drawer } from "./components/Drawer";
import LoginPage from "./pages/LoginPage";
import PageName from "./pages/PageName";
import AddMemberPage from "./pages/AddMemberPage";
import SearchPage from "./pages/SearchPage";
import ListMembersPage from "./pages/ListMembersPage";
import firebase from "./Firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

interface ResponsiveDrawerProps {
  container?: any;
}

const App = ({ container }: ResponsiveDrawerProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageName, setPageName] = useState(PageName.Login);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        setPageName(PageName.Login);
      })
      .catch(_ => {
        window.close();
      });
  };

  const performDrawerAction = (action: DrawerAction | null) => {
    switch (action) {
      case DrawerAction.Add:
        setPageName(PageName.Add);
        break;
      case DrawerAction.ListAll:
        setPageName(PageName.ListAll);
        break;
      case DrawerAction.Serach:
        setPageName(PageName.Search);
        break;
      case DrawerAction.Logout:
        logout();
        break;
    }
  };

  const onLogin = () => {
    setPageName(PageName.Add);
    setIsLoggedIn(true);
  };

  const page = () => {
    switch (pageName) {
      case PageName.Login:
        return <LoginPage loginCallaback={onLogin} />;
      case PageName.Add:
        return <AddMemberPage />;
      case PageName.ListAll:
        return <ListMembersPage />;
      case PageName.Search:
        return <SearchPage />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            מועדון חברותיםות – פאנל ניהול
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            isLoggedIn={isLoggedIn}
            perform={performDrawerAction}
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            isLoggedIn={isLoggedIn}
            perform={performDrawerAction}
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          />
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {page()}
      </main>
    </div>
  );
};

export default App;
