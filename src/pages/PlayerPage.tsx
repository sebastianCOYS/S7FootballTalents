import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { CircularProgress, Typography } from "@mui/material"
import { Paper } from "@mui/material";
import useAi from "../hooks/useAi";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import PlayerOffensiveStats from "../components/PlayerOffensiveStats";
import PlayerDefensiveStats from "../components/PlayerDefensiveStats";
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import { Alert } from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import PlayersRadarChart from "../components/PlayersRadarChart";
import { Divider } from "@mui/material";

export default function PlayerPage() {

    const { playerRk } = useParams();
    const { player, error, isLoading } = usePlayer(Number(playerRk));
    const { summary, roleFit, profileTag, insights, isLoading: isLoadingAi, error: errorAi, apiLimitReached, generateAiPlayerSummary } = useAi(player);

    if (isLoading) return <><Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}><CircularProgress size={80} /></Box></>;
    if (error) return <><Alert severity="error">Something went wrong</Alert></>;
    if (player === null) return <><Alert severity="error">No player found...</Alert></>;
    return (<>
        <Button sx={{ width: "100%", my: 2, borderRadius: "20px" }} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerSummary}>{isLoadingAi ? "loading..." : "AI analyze player"}</Button>
        <Paper sx={{ p: 4, borderRadius: "20px" }}>
            <Typography sx={{ minHeight: "50px" }}>{summary ? summary : errorAi}</Typography>
        </Paper>


        <Paper sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, width: "100%", minHeight: "100px", borderRadius: "20px", py: 2, marginTop: 4 }}>
            {insights?.map((insight, index) => {
                return (
                    <Box key={index}>
                        <Box sx={{ p: 2 }}><strong><Typography variant='h5'>{insight.label}</Typography></strong></Box>
                        <Divider></Divider>
                        <Box sx={{ p: 2 }}>{insight.evidence}</Box>
                        <Box sx={{ p: 2 }}>{insight.interpretation}</Box>
                    </Box>
                )
            })}
        </Paper>
        <Box sx={{ display: "flex", my: 4, flexWrap: "wrap", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ m: 2 }}>Percentiles</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                <Paper sx={{ minWidth: "200px", p: 2, borderRadius: "20px" }}><Typography color="primary.light">Goals/90</Typography><Typography>{player.gls_percentile}th</Typography></Paper>
                <Paper sx={{ minWidth: "200px", p: 2, borderRadius: "20px" }}> <Typography color="primary.light">Assists/90</Typography><Typography>{player.ast_percentile}th</Typography></Paper>
                <Paper sx={{ minWidth: "200px", p: 2, borderRadius: "20px" }}><Typography color="primary.light">Progressive Carries/90</Typography><Typography>{player.prgc_percentile}th</Typography></Paper>
                <Paper sx={{ minWidth: "200px", p: 2, borderRadius: "20px" }}><Typography color="primary.light">Progressive Passes/90</Typography><Typography>{player.prgp_percentile}th</Typography></Paper>
                <Paper sx={{ minWidth: "200px", p: 2, borderRadius: "20px" }}> <Typography color="primary.light">expected Goals/90</Typography><Typography>{player.xg_percentile}th</Typography></Paper>
            </Box>
        </Box>
        <Stack sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", py: 4 }}>
            <PlayersRadarChart players={[player]} chartType="offensive" />
            <PlayersRadarChart players={[player]} chartType="defensive" />
            {player.Pos === "GK" && <PlayersRadarChart players={[player]} chartType="goalkeeping" />}
        </Stack>
        <PlayerGeneralStats player={player} roleFit={roleFit} profileTag={profileTag} insights={insights} />
        {player.Pos === "GK" && <PlayerGoalkeepingStats {...player} />}
        <PlayerOffensiveStats {...player} />
        <PlayerDefensiveStats {...player} />
    </>
    )
}
