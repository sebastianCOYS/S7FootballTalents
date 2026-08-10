import { Link } from "react-router";
import { useState } from "react";
import { useContext } from "react";
//design
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { ColorModeContext } from "../contexts/ColorModeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "@mui/material/styles";

type NavItem = {
  page: string;
  link: string;
}
type HeaderProps = {
  navItems: NavItem[];
}



export default function Header({ navItems }: HeaderProps) {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const mode = theme.palette.mode;
  const isDarkMode = mode === "dark";
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };



  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  return (
    <AppBar position="static" sx={{ py: 2, px: { xs: 1, md: 2 } }}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          disableGutters
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
            alignItems: "center",
          }}
        >
          <MenuItem component={Link} to={"/"} sx={{ justifySelf: "start", textDecoration: "none", borderRadius: "20px" }}>
            <Typography sx={{ fontSize: "2rem" }}><strong>S7</strong></Typography>
          </MenuItem>

          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map(({ page, link }) => (
                <MenuItem sx={{ borderRadius: "20px" }} key={page} onClick={handleCloseNavMenu} component={Link} to={link}>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>

              ))}
            </Menu>
            <IconButton
              aria-label="Open navigation menu"
              aria-controls={anchorElNav ? "menu-appbar" : undefined}
              aria-expanded={anchorElNav ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {navItems.map(({ page, link }) => (
              <Button
                component={Link}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "text.primary", m: 2, display: "block", borderRadius: "20px" }}
                to={link}
              >
                <Typography variant="subtitle1" >
                  {page}
                </Typography>

              </Button>
            ))}
          </Box>
          <Box sx={{ justifySelf: "end" }}>
            <Button variant="outlined" sx={{ color: "text.primary", p: 2, backgroundColor: "background.paper", borderRadius: "20px", border: "3px solid", borderColor: "primary.main" }} onClick={colorMode.toggleColorMode}>
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
