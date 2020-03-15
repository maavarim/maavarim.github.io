import React from "react";
import Divider from "@material-ui/core/Divider";
import {
  Drawer as MaterialUIDrawer,
  DrawerProps as MaterialUIDrawerProps
} from "@material-ui/core";
import {
  PersonAddTwoTone,
  ListAltTwoTone,
  EditTwoTone,
  LockTwoTone,
  LockOpenTwoTone
} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    }
  })
);

export enum DrawerAction {
  Add,
  ListAll,
  Serach,
  Logout
}

type ListItemContent = {
  icon: JSX.Element;
  action?: DrawerAction;
  title: string;
};

interface DrawerProps extends MaterialUIDrawerProps {
  isLoggedIn: boolean;
  perform: (action: DrawerAction | null) => void;
}

export const Drawer = ({ isLoggedIn, perform, ...props }: DrawerProps) => {
  const classes = useStyles();

  const pages: (ListItemContent | null)[] = isLoggedIn
    ? [
        {
          icon: <PersonAddTwoTone />,
          action: DrawerAction.Add,
          title: "הוספת חבר.ה"
        },
        {
          icon: <ListAltTwoTone />,
          action: DrawerAction.ListAll,
          title: "כל החברים.ות"
        },
        {
          icon: <EditTwoTone />,
          action: DrawerAction.Serach,
          title: "חיפוש ועריכה"
        },
        null,
        { icon: <LockTwoTone />, action: DrawerAction.Logout, title: "התנתקות" }
      ]
    : [{ icon: <LockOpenTwoTone />, title: "התחברות" }];

  return (
    <MaterialUIDrawer {...props}>
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {pages.map((listItem, index) =>
            listItem ? (
              <ListItem
                button
                key={index}
                onClick={() =>
                  listItem.action !== undefined && perform(listItem.action)
                }
              >
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.title} />
              </ListItem>
            ) : (
              <Divider key={index} />
            )
          )}
        </List>
      </div>
    </MaterialUIDrawer>
  );
};
