import { Button, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";

interface LoggedOutProps {
  handleGoogleSignIn: () => void;
}

const LoggedOut: React.FC<LoggedOutProps> = ({ handleGoogleSignIn }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        gap: "1rem",
      }}>
      <div>
        <Typography variant="h5" gutterBottom style={{ color: theme.palette.text.primary }}>
          Nexus Spark: Sua secretária virtual com tecnologia Google AI.
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: theme.palette.text.secondary }}>
          Agende compromissos com profissionais de forma simples e eficiente. Para começar, faça login com sua conta do
          Google.
        </Typography>
        <Button
          startIcon={<GoogleIcon />}
          size="large"
          variant="contained"
          color={theme.palette.mode === "dark" ? "primary" : "secondary"}
          onClick={handleGoogleSignIn}>
          Entrar
        </Button>
      </div>
    </Box>
  );
};

export default LoggedOut;
