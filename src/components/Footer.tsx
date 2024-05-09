import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.primary.main,
        paddingBottom: "10px",
        paddingTop: "10px",
      }}>
      <Typography
        color={theme.palette.mode === "dark" ? "textSecondary" : "white"}
        variant="subtitle2"
        component="span">
        © 2024 Octávio Garcia
      </Typography>
    </Box>
  );
}
