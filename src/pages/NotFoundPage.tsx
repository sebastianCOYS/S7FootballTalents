import Header from "../components/Header.tsx"
import { Typography, Box } from "@mui/material";

export default function NotFoundPage() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Box sx={{display: "flex", width: "100%", height:"100vh", justifyContent: "center", paddingTop: "10px"}}>
        <Typography variant="h2">This page doesn't exist...</Typography>
        </Box>
        </>

    )
}