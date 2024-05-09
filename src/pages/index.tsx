import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

interface HomeProps {
  toggleTheme: () => void;
}

export default function Home({ toggleTheme }: HomeProps) {
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
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          bgcolor: (theme) => theme.palette.background.default,
        }}>
        <span>PlaceHolder</span>
      </Box>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
}
