import Header from "../components/Header";
import { Typography } from "@mui/material";
import PlayerListComparePlayers from "../components/PlayerListComparePlayers";
export default function ComparePlayers () {
    
    return (<>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Typography variant={"h1"}>Compare Players</Typography>
        <PlayerListComparePlayers></PlayerListComparePlayers>
    </>)
}