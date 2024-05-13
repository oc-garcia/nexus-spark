import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Alert, IconButton, Snackbar, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUser } from "@/context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import HubIcon from "@mui/icons-material/Hub";

interface TopBarProps {
  toggleTheme: () => void;
}

export default function TopBar({ toggleTheme }: TopBarProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { user, logOut } = useUser();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "info" | "warning" | "error">("info");
  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSignOut = () => {
    try {
      logOut();
      setSnackbarMessage("Deslogado com sucesso");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Erro ao fazer logout");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HubIcon sx={{ marginRight: "0.5rem" }} color={theme.palette.mode === "dark" ? "primary" : "secondary"} />
          <Typography variant={matches ? "h4" : "h6"} noWrap component="h1" sx={{ flexGrow: 1 }}>
            Nexus Spark
          </Typography>
          {user && (
            <IconButton color="inherit" onClick={handleSignOut}>
              <LogoutIcon />
            </IconButton>
          )}
          <IconButton edge="end" color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
