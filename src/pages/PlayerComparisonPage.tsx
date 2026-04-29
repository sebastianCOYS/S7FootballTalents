import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { Typography, Paper, Box } from "@mui/material";
import Header from "../components/Header";
import useAiComparison from "../hooks/useAiComparison";
import {Button} from "@mui/material";
import { RadarChart } from '@mui/x-charts/RadarChart';
import { Container } from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import PlayerOffensiveStats from "../components/PlayerOffensiveStats";
import PlayerDefensiveStats from "../components/PlayerDefensiveStats";
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import {Alert} from "@mui/material";
import {CircularProgress} from "@mui/material";
import Footer from "../components/Footer";
import {Stack} from "@mui/material";
import PlayersRadarChart from "../components/PlayersRadarChart";
import "./styles/compare.css"; 
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]

export default function PlayerComparisonPage() {
    const { playerXRk, playerYRk } = useParams();

    const { player: playerX, error: errorX, isLoading: isLoadingX } = usePlayer(Number(playerXRk));
    const { player: playerY, error: errorY, isLoading: isLoadingY } = usePlayer(Number(playerYRk));
    const {summary, nicknameX, nicknameY, ratingX, ratingY, apiLimitReached, isLoading: isLoadingAi, error: errorAi, generateAiPlayerComparison} = useAiComparison(playerX, playerY);
    if (isLoadingX || isLoadingY) return <><Header navItems={navItems}/><Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width:"100vw", height: "100vh"}}><CircularProgress size={80}/></Box></>;
    if (errorX || errorY) return <><Header navItems={navItems}/><Alert severity="error">Something went wrong</Alert></>;
    if (playerX === null || playerY === null) return <><Header navItems={navItems}/><Alert severity="error">No player found...</Alert></>;

        return ( 
            <>
            <Header navItems={navItems}/>
            <Container maxWidth="xl">
                <Paper sx={{padding: 2}} variant={"outlined"} className="container">
                    <Button sx={{width: "100%", my: 1}} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerComparison}>{isLoadingAi ? "loading..." : "AI compare players"}</Button>
                    <Paper sx={{p: 2}}>
                        <Typography sx={{minHeight: "100px"}}>{summary ? summary : errorAi}</Typography>
                    </Paper>
                </Paper>
                <Stack sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                <PlayersRadarChart playerX={playerX} playerY={playerY} chartType="offensive"/>    
                <PlayersRadarChart playerX={playerX} playerY={playerY} chartType="defensive"/>    
                {playerX.Pos === "GK" && <PlayersRadarChart playerX={playerX} playerY={playerY} chartType="goalkeeping"/>}    
                </Stack>    
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>

                    <Box sx={{ width: "50%" }}>
                        <PlayerGeneralStats player={playerX} rating={ratingX} nickname={nicknameX}/>
                        <PlayerGoalkeepingStats {...playerX}/>
                        <PlayerOffensiveStats {...playerX}/>
                        <PlayerDefensiveStats {...playerX}/>
                    </Box>
      
                    <Box sx={{ width: "50%" }}>
                        <PlayerGeneralStats player={playerY} rating={ratingY} nickname={nicknameY}/>
                        <PlayerGoalkeepingStats {...playerY}/>
                        <PlayerOffensiveStats {...playerY}/>
                        <PlayerDefensiveStats {...playerY}/>   
                    </Box>
                </Box>

            </Container>
            <Footer />
            </>
        );
}