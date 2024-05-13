import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import { auth } from "@/firebase/firebase";
import {
  browserLocalPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
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
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
          setUser(user);
          setSnackbarMessage(user ? "Você está logado!" : "Voce não está logado!");
          setSnackbarSeverity(user ? "success" : "error");
          setSnackbarOpen(true);
        });

        getRedirectResult(auth)
          .then((result) => {
            if (result) {
              const user: any = result.user;
              return user;
            }
          })
          .then((user) => {
            if (user) {
              return user;
            }
          })
          .then((user) => {
            if (user && user.apiKey && user.appName) {
              localStorage.setItem(
                `firebase:authUser:${JSON.stringify(user.apiKey)}:${JSON.stringify(user.appName)}`,
                JSON.stringify(user)
              );
              setUser(user);
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
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage("Erro ao fazer login");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        if (result) {
          const user: any = result.user;
          return user;
        }
      })
      .then((user) => {
        if (user) {
          return user;
        }
      })
      .then((user) => {
        if (user && user.apiKey && user.appName) {
          localStorage.setItem(
            `firebase:authUser:${JSON.stringify(user.apiKey)}:${JSON.stringify(user.appName)}`,
            JSON.stringify(user)
          );
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
