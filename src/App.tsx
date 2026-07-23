import { useMemo, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout.tsx";
import { ColorModeContext } from "./contexts/ColorModeContext";
import AdvancedSearch from "./pages/AdvancedSearch.tsx";
import ComparePlayers from "./pages/ComparePlayers.tsx";
import Home from "./pages/Home.tsx";
import NameSearch from "./pages/NameSearch.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PlayerComparisonPage from "./pages/PlayerComparisonPage.tsx";
import PlayerPage from "./pages/PlayerPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/name_search", element: <NameSearch /> },
      { path: "/advanced_search", element: <AdvancedSearch /> },
      { path: "/compare_players", element: <ComparePlayers /> },
      { path: "/player/:playerRk", element: <PlayerPage /> },
      { path: "/playerComparisonPage/:playerXRk/:playerYRk", element: <PlayerComparisonPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
  });

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((previousMode) => {
        const nextMode = previousMode === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", nextMode);
        return nextMode;
      });
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: "rgba(28, 203, 203, 1)",
      },
      secondary: {
        main: "#ff8400",
      },
      background: {
        default: mode === "dark" ? "#0c0c0c" : "#f5f5f5",
        paper: mode === "dark" ? "#151515ff" : "#ffffff",
      },
    },
    typography: {
      h1: { fontSize: "6rem" },
      h2: { fontSize: "3rem" },
      h3: { fontSize: "3rem" },
      h4: { fontSize: "1.25rem" },
      h5: { fontSize: "1.25rem" },
      h6: { fontSize: "1.25rem" },
      subtitle1: { fontSize: "1.25rem" },
      subtitle2: { fontSize: "1.25rem" },
      body1: { fontSize: "1.25rem" },
      button: { fontSize: "1.25rem" },
      body2: { fontSize: "0.875rem" },
      caption: { fontSize: "0.875rem" },
      overline: { fontSize: "0.875rem" },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#111111" : "#ffffff",
          },
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", width: "100%" }}>
            <RouterProvider router={router} />
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
