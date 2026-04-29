import {useParams} from "react-router";
import usePlayer from "../hooks/usePlayer";
import {CircularProgress, Typography} from "@mui/material"
import Header from "../components/Header";
import {Paper} from "@mui/material";
import useAi from "../hooks/useAi";
import {Button} from "@mui/material";
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import PlayerOffensiveStats from "../components/PlayerOffensiveStats";
import PlayerDefensiveStats from "../components/PlayerDefensiveStats";
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import {Alert} from "@mui/material";
import {Container} from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import Footer from "../components/Footer";
import PlayerRadarChart from "../components/PlayerRadarChart";
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
    <Stack sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <PlayerRadarChart player={player} chartType="offensive"/>
            <PlayerRadarChart player={player} chartType="defensive"/>
            {player.Pos === "GK" && <PlayerRadarChart player={player} chartType="goalkeeping"/>}
    </Stack>
    <PlayerGeneralStats player={player} rating={rating} nickname={nickname}/>
    { player.Pos === "GK" && <PlayerGoalkeepingStats {...player}/> }
    <PlayerOffensiveStats {...player}/>
    <PlayerDefensiveStats {...player}/>
</Container>
<Footer />
    </> 
        )
    }
