import Header from "../components/Header";
import { Typography } from "@mui/material";
import PlayerListComparePlayers from "../components/PlayerListComparePlayers";
import Title from "../components/Title"
export default function ComparePlayers () {

    
    return (<>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Title>Compare Players</Title>
        <PlayerListComparePlayers></PlayerListComparePlayers>
    </>)
}