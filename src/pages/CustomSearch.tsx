import Header from "../components/Header.tsx";
import PlayerList from "../components/PlayerList.tsx";
import Typography from "@mui/material/Typography";
import Title from "../components/Title.tsx";
export default function CustomSearch() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Title>Search through statistics</Title>
        <PlayerList/>        
        </>
    )
}
