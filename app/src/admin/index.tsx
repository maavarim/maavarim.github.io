import React from "react";
import { Typography, Dialog, DialogContent } from "@material-ui/core";
import AdminPanel from "./AdminPanel";

interface AdminDialogPanelProps {
  open: boolean;
  onClose: () => void;
}

const AdminDialogPanel = ({ open, onClose }: AdminDialogPanelProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent style={{ padding: "0" }}>
      <AdminPanel />
    </DialogContent>
  </Dialog>
);

export default AdminDialogPanel;
