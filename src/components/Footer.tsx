import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Container } from "@mui/material";
import {AppBar} from "@mui/material";
export default function Footer() {
    return (
        <AppBar sx={{position: "static", marginTop: "50px"}}>
            <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center",paddingTop: "20px", paddingBottom: "20px"}}>

            <Typography sx={{textAlign: "center"}} variant="body1" color="text.secondary">
                © 2026 S7 Football Talents
            </Typography>

            <IconButton component="a" href="https://github.com/sebastianCOYS" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" size="small" color="inherit">
                <GitHubIcon fontSize="large" />
            </IconButton>
            </Container>
        </AppBar>
    )
}