import Header from "../components/Header.tsx";
import PlayerList from "../components/PlayerList.tsx";
import Title from "../components/Title.tsx";
import Footer from "../components/Footer.tsx";
import { Container } from "@mui/material";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]
export default function CustomSearch() {
    return (
        <>
        <Header navItems={navItems}/>
        <Container maxWidth="xl">
            <Title>Search through statistics</Title>
            <PlayerList/>        
        </Container>
        <Footer />
        </>
    )
}
