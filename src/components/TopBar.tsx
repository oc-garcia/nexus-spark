import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { IconButton, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUser } from "@/context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";

interface TopBarProps {
  toggleTheme: () => void;
}

export default function TopBar({ toggleTheme }: TopBarProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { user } = useUser();
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant={matches ? "h4" : "h6"} noWrap component="h1" sx={{ flexGrow: 1 }}>
            Nexus Spark
          </Typography>
          {user && (
            <IconButton  color="inherit" onClick={handleSignOut}>
              <LogoutIcon />
            </IconButton>
          )}
          <IconButton edge="end" color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
