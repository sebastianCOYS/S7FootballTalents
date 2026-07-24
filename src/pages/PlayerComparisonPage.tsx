import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { Typography, Paper, Box } from "@mui/material";
import useAiComparison from "../hooks/useAiComparison";
import { Button } from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import PlayerOffensiveStats from "../components/PlayerOffensiveStats";
import PlayerDefensiveStats from "../components/PlayerDefensiveStats";
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import { Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/material";
import PlayersRadarChart from "../components/PlayersRadarChart";
import "./styles/compare.css";

export default function PlayerComparisonPage() {
    const { playerXRk, playerYRk } = useParams();

    const { player: playerX, error: errorX, isLoading: isLoadingX } = usePlayer(Number(playerXRk));
    const { player: playerY, error: errorY, isLoading: isLoadingY } = usePlayer(Number(playerYRk));
    const { summary, apiLimitReached, isLoading: isLoadingAi, error: errorAi, generateAiPlayerComparison } = useAiComparison(playerX, playerY);
    if (isLoadingX || isLoadingY) return <><Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}><CircularProgress size={80} /></Box></>;
    if (errorX || errorY) return <><Alert severity="error">Something went wrong</Alert></>;
    if (playerX === null || playerY === null) return <><Alert severity="error">No player found...</Alert></>;

    return (
        <>
            <Button sx={{ width: "100%", my: 2 }} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerComparison}>{isLoadingAi ? "loading..." : "AI compare players"}</Button>
            <Paper sx={{ p: 4, mb: 8 }}>
                <Typography sx={{ minHeight: "100px" }}>{summary ? summary : errorAi}</Typography>
            </Paper>
            <Stack sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <PlayersRadarChart players={[playerX, playerY]} chartType="offensive" />
                <PlayersRadarChart players={[playerX, playerY]} chartType="defensive" />
                {playerX.Pos === "GK" && <PlayersRadarChart players={[playerX, playerY]} chartType="goalkeeping" />}
            </Stack>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, gap: 4, p: 4 }}>

                <Box sx={{ width: "100%" }}>
                    <PlayerGeneralStats player={playerX} />
                    <PlayerGoalkeepingStats {...playerX} />
                    <PlayerOffensiveStats {...playerX} />
                    <PlayerDefensiveStats {...playerX} />
                </Box>

                <Box sx={{ width: "100%" }}>
                    <PlayerGeneralStats player={playerY} />
                    <PlayerGoalkeepingStats {...playerY} />
                    <PlayerOffensiveStats {...playerY} />
                    <PlayerDefensiveStats {...playerY} />
                </Box>
            </Box>
        </>
    );
}
