import { Button } from "@mui/material";
import React from "react";
import { COLORS } from "../Constants";

export default function Btn({
  title,
  size,
  type,
  disableElevation,
  onClick,
  style,
  startIcon,
  endIcon,
  action,
  disabled
}) {
  return (
    <Button
      type={action || "button"}
      disabled={disabled}
      onClick={onClick}
      disableElevation={disableElevation || false}
      variant="contained"
      style={{
        ...(size?.toLowerCase() === "full"
          ? { width: "100%" }
          : { width: "auto" }),
        ...style,
      }}
      sx={{
        backgroundColor:
          type?.toLowerCase() === "primary" ? COLORS.Primary : COLORS.Accent,
        color: "white",
      }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {title}
    </Button>
  );
}
