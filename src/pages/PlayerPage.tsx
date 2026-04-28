import {useParams} from "react-router";
import usePlayer from "../hooks/usePlayer";
import {CircularProgress, Typography} from "@mui/material"
import Header from "../components/Header";
import {Paper} from "@mui/material";
import useAi from "../hooks/useAi";
import {Button} from "@mui/material";
import {Chip} from "@mui/material";
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import PlayerOffensiveStats from "../components/PlayerOffensiveStats";
import PlayerDefensiveStats from "../components/PlayerDefensiveStats";
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import {Alert} from "@mui/material";
import {Container} from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import Footer from "../components/Footer";
import { RadarChart } from '@mui/x-charts/RadarChart';
 const navItems = [
        {page: "Search by name", link: "/name_search"},
        {page: "advanced Search", link: "/custom_search"},
        {page: "Compare players", link: "/compare_players"},
    ]

export default function PlayerPage() {

    const {playerRk} = useParams();
    const {player, error, isLoading} = usePlayer(Number(playerRk));   
    const {summary, nickname, rating, isLoading: isLoadingAi, error: errorAi, apiLimitReached, generateAiPlayerSummary } = useAi(player);
    
    
    if (isLoading) return <><Header navItems={navItems}/><Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width:"100vw", height: "100vh"}}><CircularProgress size={80}/></Box></>;
    if (error) return <><Header navItems={navItems}/><Alert severity="error">Something went wrong</Alert></>;
    if (player === null) return <><Header navItems={navItems}/><Alert severity="error">No player found...</Alert></>;
    return (<>
    <Header navItems={navItems}/>
    <Container maxWidth="xl">
    <Button sx={{width: "100%", my: 1}} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerSummary}>{isLoadingAi ? "loading..." : "AI analyze player"}</Button>
    <Paper sx={{p: 2}}>
        <Typography sx={{minHeight: "100px"}}>{summary ? summary : errorAi}</Typography>
    </Paper>
    <PlayerGeneralStats player={player} rating={rating} nickname={nickname}/>
    <PlayerGoalkeepingStats {...player}/>
    <PlayerOffensiveStats {...player}/>
    <PlayerDefensiveStats {...player}/>
    <Stack sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        <RadarChart height={300}
                series={[
                    { label: player.Player, data: [player.Gls, player["G-PK"], player.Ast, player.xG, player.npxG, player.xAG, player["G+A"], player.Carries,  player.PrgP, player.PrgC], fillArea: true },
                ]}
                radar={{metrics: ['Goals', 'Goals-PK', 'Assists', 'xG','npxG', 'xAG', 'G+A', 'Carries', 'Progressive p.', 'Progressive c.','key passes']}}
                
                />    
                <RadarChart height={300}
                series={[
                    { label: player.Player, data: [player.TklW, player.Int, player.Clr, player.Recov, player.CrdY, player.CrdR], fillArea: true },
                ]}
                radar={{metrics: ['Tackles Won', 'Interceptions', 'Clearances', 'Recoveries', 'Yellow C.', 'Red C.']}}
                
                />
    </Stack>
</Container>
<Footer />
    </> 
        )
    }
