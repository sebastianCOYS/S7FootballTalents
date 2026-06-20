import { Link } from "react-router";
import { Button, Paper } from "@mui/material";
//components
import "./styles/Home.css";
import { Typography } from "@mui/material";
import Title from "../components/Title.tsx";
import FeatureGrid from "../components/FeatureGrid.tsx";
import SearchIcon from '@mui/icons-material/Search';
import { Radar } from "@mui/icons-material";
import { CompareArrows } from "@mui/icons-material";
import { AutoAwesome } from "@mui/icons-material";
import { Box } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import { SupervisorAccount } from "@mui/icons-material";
import Subtitle from "../components/Subtitle.tsx";
const features = [
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
    {
        title: "AI analysis",
        description: "Let AI help you analyze your desired player.",
        icon: <AutoAwesome fontSize="large" />,
    },
    {
        title: "Percentile",
        description: "See where your player ranks amongst others in a given metric.",
        icon: <TrendingUp fontSize="large" />,
    },
    {
        title: "System fit",
        description: "See what system and role the player is best suited for.",
        icon: <SupervisorAccount fontSize="large" />,
    },
]


export default function Home() {

    return (
        <>
            <Title><strong>Data-driven</strong> Football Scouting</Title>
            <Subtitle>Extensive football scouting, available on a free, open-source platform.</Subtitle>
            <Box sx={{display: "flex", gap: {xs: "0", sm: "1rem"}, flexDirection: {xs: "column", sm: "row"}}}>
            <Button sx={{ width: "100%", p: 3, marginTop: "10px", borderRadius: "20px", border: "solid 3px" }} variant="outlined"  component={Link} to={"/custom_search"}><Typography sx={{ color: "text.primary" }}>Advanced Search</Typography></Button> <br />
            <Button sx={{ width: "100%", p: 3, marginTop: "10px", borderRadius: "20px", border: "solid 3px" }} variant="outlined"  component={Link} to={"/name_search"}><Typography sx={{ color: "text.primary" }}>Search by name</Typography></Button> <br />
            <Button sx={{ width: "100%", p: 3, marginTop: "10px", borderRadius: "20px", border: "solid 3px" }} variant="outlined"  component={Link} to={"/compare_players"}><Typography sx={{ color: "text.primary" }}>Compare players</Typography></Button> <br />
            </Box>
            <Typography sx={{ marginTop: "4rem", marginBottom: "2rem" }} variant={"h2"}>Features</Typography>
            <FeatureGrid features={features}></FeatureGrid>
            <Typography sx={{ marginTop: "4rem", marginBottom: "2rem", maxWidth: "800px" }} variant={"h2"}>Featuring players from <strong>all 5 biggest leagues</strong></Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", justifyContent: "center", py: "20px", flexWrap: "wrap" }}>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: {xs: "100%", sm:"30%"}, height: "200px" }}><img width={"150px"} src="src/images/premierleague.png" alt="prem" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: {xs: "100%", sm:"30%"}, height: "200px" }}><img width={"100px"} src="src/images/laliga.png" alt="laliga" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: {xs: "100%", sm:"30%"}, height: "200px" }}><img width={"100px"} src="src/images/ligue1.png" alt="ligue 1" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: {xs: "100%", sm:"30%"}, height: "200px" }}><img width={"150px"} src="src/images/seriea.png" alt="serie a" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: {xs: "100%", sm:"30%"}, height: "200px" }}><img width={"100px"} src="src/images/bundesliga.png" alt="bundesliga" /></Paper>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ marginTop: "4rem", marginBottom: "2rem", maxWidth: "800px" }} variant={"h2"} >Get <strong>advanced analysis</strong>, key insights and the system the player is best suited for.</Typography>
                <Box sx={{backgroundColor: "#171717", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", display: "flex", flexDirection: "row", gap: "1rem", height: "35px", alignItems: "center", paddingLeft: "1rem"}}>
                    <Box sx={{width: "12px", height: "12px", borderRadius: "100px", backgroundColor: "gray"}}></Box>
                    <Box sx={{width: "12px", height: "12px", borderRadius: "100px", backgroundColor: "gray"}}></Box>
                    <Box sx={{width: "12px", height: "12px", borderRadius: "100px", backgroundColor: "gray"}}></Box>
                </Box>
                <video src="src/images/ai_analysis_showcase_1080.mp4" autoPlay muted loop style={{ borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", border: "solid 10px #171717" }}></video>
                </Box>
        </>
    )
};