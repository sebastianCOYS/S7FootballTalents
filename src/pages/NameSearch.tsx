import Header from "../components/Header.tsx"
import PlayerListSearchName from "../components/PlayerListSearchName.tsx";
import Typography from "@mui/material/Typography";

export default function NameSearch() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Typography variant="h1">Search with Name</Typography>
        <PlayerListSearchName />
        </>
    )
}