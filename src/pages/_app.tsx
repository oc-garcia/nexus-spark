import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Head from "next/head";
import React from "react";
import { PaletteMode } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@/context/UserContext";

export default function MyApp(props: AppProps) {
  let { Component, pageProps } = props;

  const queryClient = new QueryClient();

  const [themeMode, setThemeMode] = React.useState<PaletteMode>("light");

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setThemeMode(savedTheme as PaletteMode);
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  pageProps = { ...pageProps, toggleTheme };

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Nexus Spark</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Nexus Spark" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <UserProvider >
            <Component {...pageProps} />
            <Analytics />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppCacheProvider>
  );
}
