import { auth } from "@/firebase/firebase";
import { Avatar, Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { signOut, User } from "firebase/auth";
import Chat from "./Chat";

interface LoggedInProps {
  user: User | null;
}

const LoggedIn: React.FC<LoggedInProps> = ({ user }) => {
  const theme = useTheme();
  const handleSignOut = () => {
    signOut(auth);
  };
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY); // This will log the value of
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div>
          <Avatar sx={{ marginBottom: "1rem" }} alt={user?.displayName || ""} src={user?.photoURL || ""} />
          <Typography variant="h5" gutterBottom style={{ color: theme.palette.text.primary }}>
            Olá, {user?.displayName}!
          </Typography>
          <Typography variant="body1" gutterBottom style={{ color: theme.palette.text.secondary }}>
            Vamos iniciar o seu atendimento?
          </Typography>
        </div>
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Sair
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Chat />
      </Box>
    </>
  );
};

export default LoggedIn;
