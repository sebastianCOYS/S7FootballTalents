import Header from "../components/Header.tsx"
import { Typography, Box } from "@mui/material";
import {Alert} from "@mui/material";
import Footer from "../components/Footer.tsx";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]
export default function NotFoundPage() {
    return (
        <>
        <Header navItems={navItems}/>
        <Alert sx={{height: "50vh"}} severity="error">This page doesn't exist...</Alert>
        <Footer />
        </>

    )
}