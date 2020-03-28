import { styled, Button } from "@material-ui/core";

export const ContainedPrimaryButton = styled(Button)({
  background: "#9c27b0",
  color: "#f1efef",
  "&:hover": {
    background: "rgba(156, 39, 176, 0.85)"
  }
});

export const PrimaryButton = styled(Button)({
  background: "#f9f9f9",
  color: "#8e24aa"
});

export const DangerButton = styled(Button)({
  background: "#f9f9f9",
  color: "#d32f2f"
});
