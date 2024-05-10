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
          Bem-vindo à Nexus Spark secretaria Virtual, alavancada pelo Gemini do Google.
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: theme.palette.text.secondary }}>
          Ela é uma secretária virtual que marca compromissos com profissionais. Para começar, faça login com sua conta
          do Google.
        </Typography>
        <Button
          startIcon={<GoogleIcon />}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}>
          Faça Login para Continuar
        </Button>
      </div>
    </Box>
  );
};

export default LoggedOut;
