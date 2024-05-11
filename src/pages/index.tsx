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
import { handleGoogleSignIn } from "@/services/auth";

interface HomeProps {
  toggleTheme: () => void;
}

export default function Home({ toggleTheme }: HomeProps) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info" | "warning" | "error">("info");

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setSnackbarMessage(user ? "Você está logado!" : "Voce não está logado!");
      setSnackbarSeverity(user ? "success" : "error");
      setSnackbarOpen(true);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
        }
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage("Erro ao fazer login");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage("Erro ao fazer login");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

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
