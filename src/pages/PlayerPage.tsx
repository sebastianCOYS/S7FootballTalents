import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { CircularProgress, Typography } from "@mui/material"
import { Paper } from "@mui/material";
import useAi from "../hooks/useAi";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import PlayerGoalkeepingStats from "../components/PlayerGoalkeepingStats";
import { Alert } from "@mui/material";
import PlayerGeneralStats from "../components/PlayerGeneralStats";
import PlayersRadarChart from "../components/PlayersRadarChart";
import { Divider } from "@mui/material";
import { Chip } from "@mui/material";
import { Tooltip } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

//percentile bg color helper
function getPercentileColor(n: number | null): string {
    if (n === null) return "transparent";

    if (n >= 95) return "rgba(28, 203, 203, 0.55)";
    if (n >= 85) return "rgba(28, 203, 203, 0.42)";
    if (n >= 70) return "rgba(28, 203, 203, 0.30)";
    if (n >= 50) return "rgba(28, 203, 203, 0.20)";
    if (n >= 30) return "rgba(28, 203, 203, 0.12)";

    return "rgba(28, 203, 203, 0.06)";
}

//https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function getNumberWithOrdinal(number: number | null) {
    if (number === null) {
        return "unranked";
    }

    const roundedNumber = Math.round(number);
    const lastTwoDigits = roundedNumber % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return `${roundedNumber}th`;
    }

    const lastDigit = roundedNumber % 10;

    if (lastDigit === 1) {
        return `${roundedNumber}st`;
    }

    if (lastDigit === 2) {
        return `${roundedNumber}nd`;
    }

    if (lastDigit === 3) {
        return `${roundedNumber}rd`;
    }

    return `${roundedNumber}th`;
}
export default function PlayerPage() {

    const { playerRk } = useParams();
    const { player, error, isLoading } = usePlayer(Number(playerRk));
    const { summary, roleFit, profileTag, insights, isLoading: isLoadingAi, error: errorAi, apiLimitReached, generateAiPlayerSummary } = useAi(player);

    if (isLoading) return <><Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}><CircularProgress size={80} /></Box></>;
    if (error) return <><Alert severity="error">Something went wrong</Alert></>;
    if (player === null) return <><Alert severity="error">No player found...</Alert></>;
    return (<>
        <Paper sx={{ borderRadius: "20px", p: 2, mt: 2 }} variant="outlined" className="item name">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h2">{player.Player}</Typography>
                <ReactCountryFlag countryCode={player.flag_code} alt={player.flag_code} title={player.flag_code} svg style={{ width: 50, height: 50, borderRadius: "10px" }} />
            </Box>

            <Typography variant="h6">{player.Squad}</Typography>

            {profileTag && roleFit ? <><Typography variant="h6">preferred role:</Typography><Chip color="warning" variant="outlined" label={profileTag} /><Typography variant="h6">tactical fit:</Typography><Chip color="warning" variant="outlined" label={roleFit} /></> : null}
        </Paper>
        <Button sx={{ width: "100%", my: 2, borderRadius: "20px" }} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerSummary}>{isLoadingAi ? "loading..." : "AI analyze player (Llama 3.3:70b)"}</Button>
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
            <Typography variant="h3" sx={{ m: 2 }}>Player percentiles</Typography>

            <Paper sx={{ width: "100%", borderRadius: "20px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}>
                                <Typography sx={{ display: "inline", mr: 2 }}>2024/2025</Typography>
                                <Tooltip title="Only compares players with over 900 minutes played that season to maintain Percentile integrity/reliability.">
                                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", border: "1px solid", borderRadius: "50%", fontSize: "12px", cursor: "help" }}>i</Box>
                                </Tooltip>
                            </th>
                            <th style={{ padding: "16px", textAlign: "center" }}>overall</th>
                            <th style={{ padding: "16px", textAlign: "center" }}>league</th>
                            <th style={{ padding: "16px", textAlign: "center" }}>team</th>
                            <th style={{ padding: "16px", textAlign: "center" }}>position</th>
                            <th style={{ padding: "16px", textAlign: "center" }}>nation</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}><Typography sx={{ display: "inline", mr: 2 }}>non-penalty goals/90</Typography></th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npg_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_npg_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npg_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_npg_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npg_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_npg_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npg_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_npg_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npg_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_npg_per90_percentile_nation)}</td>
                        </tr>


                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}><Typography sx={{ display: "inline", mr: 2 }}>non-penalty xG/90</Typography></th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npxG_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_npxG_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npxG_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_npxG_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npxG_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_npxG_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npxG_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_npxG_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_npxG_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_npxG_per90_percentile_nation)}</td>
                        </tr>

                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}><Typography sx={{ display: "inline", mr: 2 }}>assists/90</Typography></th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_assists_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_assists_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_assists_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_assists_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_assists_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_assists_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_assists_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_assists_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_assists_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_assists_per90_percentile_nation)}</td>
                        </tr>

                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}><Typography sx={{ display: "inline", mr: 2 }}>xA/90</Typography></th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xA_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_xA_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xA_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_xA_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xA_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_xA_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xA_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_xA_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xA_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_xA_per90_percentile_nation)}</td>
                        </tr>

                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}>
                                <Typography sx={{ display: "inline", mr: 2 }}>xG buildup/90</Typography>

                                <Tooltip title="xG Buildup measures the expected goals generated by possessions in which the player was involved, excluding their own shots and key passes. It focuses on involvement before the final action.">
                                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", border: "1px solid", borderRadius: "50%", fontSize: "12px", cursor: "help" }}>i</Box>
                                </Tooltip>
                            </th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGBuildup_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_xGBuildup_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGBuildup_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_xGBuildup_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGBuildup_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_xGBuildup_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGBuildup_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_xGBuildup_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGBuildup_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_xGBuildup_per90_percentile_nation)}</td>
                        </tr>

                        <tr>
                            <th style={{ padding: "16px", textAlign: "left" }}>
                                <Typography sx={{ display: "inline", mr: 2 }}>xG chain/90</Typography>
                                <Tooltip title="xG Chain measures the total expected goals generated by possessions in which the player was involved. Higher values indicate greater involvement in dangerous attacking sequences.">
                                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", border: "1px solid", borderRadius: "50%", fontSize: "12px", cursor: "help" }}>i</Box>
                                </Tooltip>
                            </th>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGChain_per90_percentile_overall) }}>{getNumberWithOrdinal(player.us_xGChain_per90_percentile_overall)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGChain_per90_percentile_league) }}>{getNumberWithOrdinal(player.us_xGChain_per90_percentile_league)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGChain_per90_percentile_team) }}>{getNumberWithOrdinal(player.us_xGChain_per90_percentile_team)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGChain_per90_percentile_position) }}>{getNumberWithOrdinal(player.us_xGChain_per90_percentile_position)}</td>
                            <td style={{ padding: "16px", textAlign: "center", backgroundColor: getPercentileColor(player.us_xGChain_per90_percentile_nation) }}>{getNumberWithOrdinal(player.us_xGChain_per90_percentile_nation)}</td>
                        </tr>
                    </tbody>
                </table>
            </Paper>
        </Box>
        <Stack sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", py: 4 }}>
            <PlayersRadarChart players={[player]} chartType="offensive" />
            <PlayersRadarChart players={[player]} chartType="defensive" />
            {player.Pos === "GK" && <PlayersRadarChart players={[player]} chartType="goalkeeping" />}
        </Stack>
        <PlayerGeneralStats player={player} />
        {player.Pos === "GK" && <PlayerGoalkeepingStats {...player} />}
    </>
    )
}
