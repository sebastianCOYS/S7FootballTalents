import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

const navItems = [
    { page: "Search by name", link: "/name_search" },
    { page: "Advanced Search", link: "/advanced_search" },
    { page: "Compare players", link: "/compare_players" },
]

export default function Layout() {


    return (

        <>
            <Header navItems={navItems} />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}
