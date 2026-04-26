import Header from "../components/Header.tsx"
import PlayerListSearchName from "../components/PlayerListSearchName.tsx";
import Title from "../components/Title.tsx";
import Subtitle from "../components/Subtitle.tsx";
import Footer from "../components/Footer.tsx";
import { Container } from "@mui/material";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]
export default function NameSearch() {
    return (
        <>
        <Header navItems={navItems}/>
        <Container maxWidth="xl">
            <Title>Search with Name</Title>
            <Subtitle>Search for any footballer and get his statistics</Subtitle>
            <PlayerListSearchName />
        </Container>
        <Footer />
        </>
    )
}