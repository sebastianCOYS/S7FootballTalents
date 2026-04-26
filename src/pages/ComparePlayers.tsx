import Header from "../components/Header";
import PlayerListComparePlayers from "../components/PlayerListComparePlayers";
import Title from "../components/Title"
import Footer from "../components/Footer";
import { Container } from "@mui/material";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]
export default function ComparePlayers () {

    
    return (<>
        <Header navItems={navItems}/>
        <Container maxWidth="xl">
            <Title>Compare Players</Title>  
            <PlayerListComparePlayers/>
        </Container>
        <Footer />
    </>)
}
