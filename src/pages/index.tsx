import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import { auth } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import LoggedOut from "@/components/LoggedOut";
import LoggedIn from "@/components/LoggedIn";
import { useUser } from "@/context/UserContext";

interface HomeProps {
  toggleTheme: () => void;
}

export default function Home({ toggleTheme }: HomeProps) {
  const [loading, setLoading] = useState(true);
  const { user, googleSignIn } = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info" | "warning" | "error">("info");

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      setSnackbarMessage("Logado com sucesso");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Erro ao fazer login");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.background.default,
      }}>
      <header>
        <TopBar toggleTheme={toggleTheme} />
      </header>
      <Box
        sx={{
          flex: 1,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          bgcolor: (theme) => theme.palette.background.default,
        }}>
        {loading ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Skeleton variant="rectangular" width="100%" height="70vh" />
          </Box>
        ) : user ? (
          <LoggedIn user={user} />
        ) : (
          <LoggedOut handleSignIn={handleSignIn} />
        )}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
}
