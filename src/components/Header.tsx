import {Link} from "react-router";
import { useState } from "react";
import { useContext } from "react";
//design
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ColorModeContext } from "../main";
import { useTheme } from "@mui/material/styles";

type NavItem = {
    page: string;
    link: string;
}
type HeaderProps = {
    navItems: NavItem[];
}
export default function Header({ navItems } : HeaderProps) {
    //type
const theme = useTheme();
const colorMode = useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
       return (
    <AppBar position="static" sx={{mb: "20px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuItem component={Link} to={"/"} sx={{textDecoration: "none", borderRadius: "4px"}}>
            S7FT
          </MenuItem>
          
          <Box sx={{ flexGrow: 1, md: 'none', display: "flex", justifyContent: "center"}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navItems.map(({page, link}) => (              
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={link}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
          <Typography
            component={Link}
            to={"/"}
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            S7FT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map(({page, link}) => (
              <Button
                component={Link}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,color: 'white', margin: 1, display: 'block' }}
                to={link}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button variant="outlined" sx={{ color: 'text.primary', backgroundColor: 'background.paper'}} onClick={colorMode.toggleColorMode}>
              Switch Theme
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}