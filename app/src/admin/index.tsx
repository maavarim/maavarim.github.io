import React from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import AdminPanel from "./AdminPanel";
import AppBar from "../components/AppBar";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface AdminDialogPanelProps {
  open: boolean;
  onClose: () => void;
}

const AdminDialogPanel = ({ open, onClose }: AdminDialogPanelProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    disableEscapeKeyDown={true}
    TransitionComponent={Transition}
  >
    <AppBar
      position="fixed"
      title="מעברים – חיפוש אנשי.ות מקצוע · פאנל ניהול"
      buttons={
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      }
    />
    <AdminPanel />
  </Dialog>
);

export default AdminDialogPanel;
