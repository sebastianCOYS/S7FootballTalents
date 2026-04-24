import { Link } from "react-router";
import { Button } from "@mui/material";
//components
import Header from "../components/Header.tsx";
import "./styles/Home.css";
import { Typography } from "@mui/material";
import Title from "../components/Title.tsx";
export default function Home() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Title>s7 football Talents</Title>
        <Button sx={{width: "100%", p: 3, m:1}} variant="outlined" component={Link} to={"/custom_search"}><Typography sx={{ color: "text.primary" }}>Custom Search</Typography></Button> <br />
        <Button sx={{width: "100%", p: 3, m:1}} variant="outlined" component={Link} to={"/name_search"}><Typography sx={{ color: "text.primary" }}>Search by name</Typography></Button> <br />
        <Button sx={{width: "100%", p: 3, m:1}} variant="outlined" component={Link} to={"/compare_players"}><Typography sx={{ color: "text.primary" }}>Compare Players</Typography></Button> <br />
        </>
    )
}       ;