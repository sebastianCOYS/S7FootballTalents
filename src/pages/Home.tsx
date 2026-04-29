import { Link } from "react-router";
import { Button } from "@mui/material";
//components
import Header from "../components/Header.tsx";
import "./styles/Home.css";
import { Typography } from "@mui/material";
import Title from "../components/Title.tsx";
import FeatureGrid  from "../components/FeatureGrid.tsx";
import SearchIcon from '@mui/icons-material/Search';
import { Radar } from "@mui/icons-material";
import { CompareArrows } from "@mui/icons-material";
import { AutoAwesome } from "@mui/icons-material";
import { SportsSoccer } from "@mui/icons-material";
import { Container } from "@mui/material";
import Footer from "../components/Footer.tsx";
import Subtitle from "../components/Subtitle.tsx";
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
        title: "Top 5 leagues",
        description: "Our database features all players out of the world's top 5 best leagues.",
        icon: <SportsSoccer fontSize="large" />
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
            <Chip label={"AI-integrated"} color="warning" variant="outlined" icon={<AutoAwesome  color="warning" fontSize="small" />}/>
            <Button sx={{width: "100%", p: 3, marginTop: "10px"}} variant="outlined" component={Link} to={"/custom_search"}><Typography sx={{ color: "text.primary" }}>Custom Search</Typography></Button> <br />
            <Button sx={{width: "100%", p: 3, marginTop: "10px"}} variant="outlined" component={Link} to={"/name_search"}><Typography sx={{ color: "text.primary" }}>Search by name</Typography></Button> <br />
            <Button sx={{width: "100%", p: 3, marginTop: "10px"}} variant="outlined" component={Link} to={"/compare_players"}><Typography sx={{ color: "text.primary" }}>Compare Players</Typography></Button> <br />
            <Typography sx={{marginTop: "20px"}} variant={"h2"}>Features</Typography>
            <FeatureGrid features={features}></FeatureGrid>
        </Container>
        <Footer/>
        
        </>
    )
}       ;