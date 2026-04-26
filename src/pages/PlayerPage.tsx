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
import {
  Unstable_RadarDataProvider as RadarDataProvider,
  RadarGrid,
  RadarSeriesMarks,
  RadarSeriesArea,
  RadarMetricLabels,
  RadarAxisHighlight,
} from '@mui/x-charts/RadarChart';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
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

    const series = [
    {
        id: playerRk,
        label: player.Player,
        data: [player.Gls, player.Ast, player.xG, player.xAG, player["G+A"], player.Carries],
        fillArea: true,
    },
    ];
    const radar = {
    metrics: ['Goals', 'Assists', 'xG', 'xAG', 'G+A', 'Carries'],
    };

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
    
        <RadarDataProvider height={300} series={series} radar={radar}>
    <Stack direction="column" sx={{ alignItems: 'center', gap: 1, width: '100%' }}>
    <ChartsLegend />
    <ChartsSurface>
        <RadarGrid divisions={5} />
        <RadarMetricLabels />
        <RadarSeriesArea
        fillOpacity={0.4}
        strokeWidth={1}
        seriesId={playerRk}
        />
        <RadarSeriesArea
        fill="transparent"
        strokeWidth={1}
        seriesId="usa-id"
        strokeDasharray="4, 4"
        strokeLinecap="round"
        />
        <RadarAxisHighlight />
        <RadarSeriesMarks />
    </ChartsSurface>
    <ChartsTooltip trigger="item" />
    </Stack>
</RadarDataProvider>
</Container>
<Footer />
    </> 
        )
    }
