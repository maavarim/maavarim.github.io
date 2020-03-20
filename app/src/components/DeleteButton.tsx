import { Button, withStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const DeleteButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  }
}))(Button);

export default DeleteButton;
