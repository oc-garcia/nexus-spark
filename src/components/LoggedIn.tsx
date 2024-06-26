import { Avatar, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Chat from "./Chat";
import { User } from "firebase/auth";

interface LoggedInProps {
  user: User | null;
}

const LoggedIn: React.FC<LoggedInProps> = ({ user }) => {
  const theme = useTheme();

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
          <Typography variant="body1" gutterBottom style={{ color: theme.palette.text.primary }}>
            Vamos iniciar o seu atendimento?
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Chat user={user} />
      </Box>
    </>
  );
};

export default LoggedIn;
