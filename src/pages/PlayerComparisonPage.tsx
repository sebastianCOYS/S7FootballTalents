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
import Footer from "../components/Footer";
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]

export default function PlayerComparisonPage() {
    const { playerXRk, playerYRk } = useParams();
    
    const { player: playerX, error: errorX, isLoading: isLoadingX } = usePlayer(Number(playerXRk));
    const { player: playerY, error: errorY, isLoading: isLoadingY } = usePlayer(Number(playerYRk));
    const {summary, apiLimitReached, isLoading: isLoadingAi, error: errorAi, generateAiPlayerComparison} = useAiComparison(playerX, playerY);
    if (isLoadingX || isLoadingY) return <Typography>loading</Typography>;
    if (errorX || errorY) return <Typography>error</Typography>;
    if (playerX === null || playerY === null) return <Typography>No player found...</Typography>;

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
    <RadarChart
      height={300}
      series={[
        { label: playerX.Player, data: [playerX.Gls, playerX.Ast, playerX.PrgP, playerX.PrgC, playerX.xG, playerX.xAG] },
        {
          label: playerY.Player,
          data: [playerY.Gls, playerY.Ast, playerY.PrgP, playerY.PrgC, playerY.xG, playerY.xAG],
        },
      ]}
      radar={{
        metrics: ['goals', 'assists', 'progressive passes', 'progressive carries', 'xG', 'xAG', 'goals - xG'],
      }}
    />        
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>

                    <Box sx={{ width: "50%" }}>
                        <PlayerGeneralStats player={playerX}/>
                        <PlayerGoalkeepingStats {...playerX}/>
                        <PlayerOffensiveStats {...playerX}/>
                        <PlayerDefensiveStats {...playerX}/>
                    </Box>
      
                    <Box sx={{ width: "50%" }}>
                        <PlayerGeneralStats player={playerY}/>
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