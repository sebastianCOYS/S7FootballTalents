import { StrictMode, useState, useMemo, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import PlayerPage from './pages/PlayerPage.tsx'
import CustomSearch from './pages/CustomSearch.tsx'
import NameSearch from "./pages/NameSearch.tsx"
import ComparePlayers from "./pages/ComparePlayers.tsx"
import PlayerComparisonPage from './pages/PlayerComparisonPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Container, Box, CssBaseline } from '@mui/material';
import "./style.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const router = createBrowserRouter([
  {path:"/", element:<Home/>},
  {path:"/home", element:<Home/>},
  {path:"/name_search", element: <NameSearch/>},
  {path:"/custom_search", element: <CustomSearch/>},
  {path:"/compare_players", element: <ComparePlayers/>},
  //any undefined route goes to...
  {path:"*", element: <NotFoundPage/>},
  //dynamic route goes to...
  {path:"/player/:playerRk", element: <PlayerPage/>},
  {path:"/playerComparisonPage/:playerXRk/:playerYRk", element: <PlayerComparisonPage/>},
]); 

export const ColorModeContext = createContext({toggleColorMode: () => {}});

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }), []);

    const theme = useMemo(() => createTheme({
      palette: {
        mode,
      },
    }), [mode]);


return (
  <>
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{bgcolor: "background.default", color: "text.primary", minHeight: "100vh", width: "100%"}}>
        <Container maxWidth="xl">
          <RouterProvider router={router}/>
        </Container>
      </Box>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
)

}

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )