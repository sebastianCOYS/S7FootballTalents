import { Link } from "react-router";
import { Button, Paper } from "@mui/material";
//components
import Header from "../components/Header.tsx";
import "./styles/Home.css";
import { Typography } from "@mui/material";
import Title from "../components/Title.tsx";
import FeatureGrid  from "../components/FeatureGrid.tsx";
import SearchIcon from '@mui/icons-material/Search';
import { MarginTwoTone, Radar } from "@mui/icons-material";
import { CompareArrows } from "@mui/icons-material";
import { AutoAwesome } from "@mui/icons-material";
import { SportsSoccer } from "@mui/icons-material";
import { Container } from "@mui/material";
import Footer from "../components/Footer.tsx";
import Subtitle from "../components/Subtitle.tsx";
import {Box} from "@mui/material";
import {Chip} from "@mui/material";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]
    const features = [
        {
        title: "AI analysis",
        description: "Let AI help you analyze your favorite player.",
        icon: <AutoAwesome fontSize="large" />,
        },
        {
        title: "Custom Search",
        description: "Filter players by goals, assists, xG, xA etc.",
        icon: <SearchIcon fontSize="large" />
        },
        {
        title: "Compare Players",
        description: "Compare two players side by side using stats and AI.",
        icon: <CompareArrows fontSize="large" />
        },
        {
        title: "Radars",
        description: "Visualize players with radar charts, indicating their strengths and weaknesses.",
        icon: <Radar fontSize="large" />,
        },
    ]
export default function Home() {

    return (
        <>
        <Header navItems={navItems}/>
        <Container maxWidth="xl">
            <Title><strong>Data-driven</strong> Football Scouting</Title>
            <Button sx={{width: "100%", p: 3, marginTop: "10px", borderRadius: "20px"}} variant="outlined" component={Link} to={"/custom_search"}><Typography sx={{ color: "text.primary" }}>Advanced Search</Typography></Button> <br />
            <Button sx={{width: "100%", p: 3, marginTop: "10px", borderRadius: "20px"}} variant="outlined" component={Link} to={"/name_search"}><Typography sx={{ color: "text.primary" }}>Search by name</Typography></Button> <br />
            <Button sx={{width: "100%", p: 3, marginTop: "10px", borderRadius: "20px"}} variant="outlined" component={Link} to={"/compare_players"}><Typography sx={{ color: "text.primary" }}>Compare players</Typography></Button> <br />
            <Typography sx={{marginTop: "40px"}} variant={"h2"}>Features</Typography>
            <FeatureGrid features={features}></FeatureGrid>
            <Typography sx={{marginTop: "40px", maxWidth: "800px"}} variant={"h2"}>Featuring players from <strong>all 5 biggest leagues</strong></Typography>
            <Box sx={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", justifyContent: "center", py: "20px", flexWrap: "wrap"}}>
                <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: "30%", height: "200px"}}><img width={"150px"} src="src/images/premierleague.png" alt="prem" /></Paper>
                <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: "30%", height: "200px"}}><img width={"100px"} src="src/images/laliga.png" alt="laliga" /></Paper>
                <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: "30%", height: "200px"}}><img width={"100px"} src="src/images/ligue1.png" alt="ligue 1" /></Paper>
                <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: "30%", height: "200px"}}><img width={"150px"} src="src/images/seriea.png" alt="serie a" /></Paper>
                <Paper sx={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: "30%", height: "200px"}}><img width={"100px"} src="src/images/bundesliga.png" alt="bundesliga" /></Paper>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography sx={{marginTop: "40px", maxWidth: "800px"}} variant={"h2"} >Get <strong>advanced analysis</strong>, key insights and the system the player is best suited for.</Typography>
            <video src="src/images/ai_analysis_showcase_1080.mp4" autoPlay muted loop style={{borderRadius: "20px"}}></video>
            </Box>
        </Container>
        <Footer/>
        
        </>
    )
}       ;