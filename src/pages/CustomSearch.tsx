import Header from "../components/Header.tsx";
import PlayerList from "../components/PlayerList.tsx";
import Typography from "@mui/material/Typography";

export default function CustomSearch() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Typography variant="h1">Search through statistics</Typography>
        <PlayerList/>        
        </>
    )
}