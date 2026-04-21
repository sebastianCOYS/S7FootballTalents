import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { Typography, Paper, Box } from "@mui/material";
import Header from "../components/Header";
import useAiComparison from "../hooks/useAiComparison";
import {Button} from "@mui/material";
export default function PlayerComparisonPage() {
    const { playerXRk, playerYRk } = useParams();

    const { player: playerX, error: errorX, isLoading: isLoadingX } = usePlayer(Number(playerXRk));
    const { player: playerY, error: errorY, isLoading: isLoadingY } = usePlayer(Number(playerYRk));
    const {summary, apiLimitReached, isLoading: isLoadingAi, error: errorAi, generateAiPlayerComparison} = useAiComparison(playerX, playerY);
    if (errorX != null || errorY != null) {
        return (
            <>  
                <p>something went wrong...</p>
            </>
        );
    }

    if (isLoadingX || isLoadingY) {
        return (
            <>
                <p>still loading...</p>
            </>
        );
    }

    if (playerX != null && playerY != null) {
        const playerXisGk = playerX.Pos === "GK";
        const playerYisGk = playerY.Pos === "GK";

        return (
            <>
                <Header navItems={[{ itemName: "S7FT", link: "/" }]}></Header>
                <Paper sx={{padding: 2}} variant={"outlined"} className="container">
                    <Button sx={{width: "100%", my: 1}} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerComparison}>{isLoadingAi ? "loading..." : "AI compare players"}</Button>
                    <Paper sx={{p: 2}}>
                        <Typography sx={{minHeight: "100px"}}>{summary ? summary : errorAi}</Typography>
                    </Paper>
                </Paper>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>

                    <Box sx={{ width: "50%" }}>
                        <Paper sx={{ padding: 2 }} variant={"outlined"} elevation={2} className="container">
                            <Paper variant="outlined" className="item name">
                                <Typography variant="h1" fontSize={{lg: "6rem", md: "5rem", sm: "3rem", xs:"1rem"}}>{playerX.Player}</Typography>
                            </Paper>
                            <Paper className="item squad">
                                <Typography color="textSecondary" className="label">team </Typography>
                                <Typography variant="h6">{playerX.Squad}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item Nation">
                                <Typography color="textSecondary" className="label">nation </Typography>
                                <Typography variant="h6">{playerX.Nation}</Typography>
                            </Paper>
                            <Paper className="item mp">
                                <Typography color="textSecondary" className="label">mp </Typography>
                                <Typography variant="h6">{playerX.MP}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item gls">
                                <Typography color="textSecondary" className="label">gls </Typography>
                                <Typography variant="h6">{playerX.Gls}</Typography>
                            </Paper>
                            <Paper className="item ast">
                                <Typography color="textSecondary" className="label">ast </Typography>
                                <Typography variant="h6">{playerX.Ast}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item pos">
                                <Typography color="textSecondary" className="label">pos </Typography>
                                <Typography variant="h6">{playerX.Pos}</Typography>
                            </Paper>
                            <Paper className="item comp">
                                <Typography color="textSecondary" className="label">comp </Typography>
                                <Typography variant="h6">{playerX.Comp}</Typography>
                            </Paper>
                        </Paper>

                        {playerXisGk ? (
                            <Paper sx={{ padding: 2, mt: 2 }} variant={"outlined"} elevation={2} className="advanced_stats_container goalkeeping">
                                <Paper variant="outlined" className="item full_width">
                                    <Typography variant="h2" sx={{ textAlign: "left" }}>Goalkeeping</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Goals Conceded</Typography>
                                    <Typography>{playerX.GA}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Goals Conceded/90</Typography>
                                    <Typography>{playerX.GA90}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Saves</Typography>
                                    <Typography>{playerX.Saves}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Save %</Typography>
                                    <Typography>{playerX["Save%"]}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Clean Sheets</Typography>
                                    <Typography>{playerX.CS} ({playerX.CS}%)</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">PSxG+/-</Typography>
                                    <Typography>{playerX["PSxG+/-"]}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Punches / Clears</Typography>
                                    <Typography>{playerX.Clr}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Errors</Typography>
                                    <Typography>{playerX.Err}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Pass %</Typography>
                                    <Typography>{playerX.Cmp}%</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Avg Pass Length</Typography>
                                    <Typography>{playerX.AvgLen}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Throws</Typography>
                                    <Typography>{playerX.Thr}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Launch %</Typography>
                                    <Typography>{playerX["Launch%"]}%</Typography>
                                </Paper>
                            </Paper>
                        ) : null}

                        <Paper sx={{ padding: 2, mt: 2 }} variant={"outlined"} elevation={2} className="advanced_stats_container">
                            <Paper variant="outlined" className="item full_width">
                                <Typography variant="h2" sx={{ textAlign: "left" }}>Offensive statistics</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary">xg + xa</Typography>
                                <Typography>{playerX.xAG}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">xg </Typography>
                                <Typography>{playerX.xG}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">xa </Typography>
                                <Typography>{playerX.xA}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">ga </Typography>
                                <Typography>{playerX.GA}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">minutes </Typography>
                                <Typography>{playerX.Min}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">G-xG </Typography>
                                <Typography>{playerX["G-xG"]}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Kp </Typography>
                                <Typography>{playerX.KP}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">SCA </Typography>
                                <Typography>{playerX.SCA}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">GCA </Typography>
                                <Typography>{playerX.GCA}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">PrgC </Typography>
                                <Typography>{playerX.PrgC}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Carries </Typography>
                                <Typography>{playerX.Carries}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Touches </Typography>
                                <Typography>{playerX.Touches}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">non-penalty xG + xA </Typography>
                                <Typography>{playerX["npxG+xAG"]}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">sca90 </Typography>
                                <Typography>{playerX.SCA90}</Typography>
                            </Paper>

                            <Paper className="item full_width">
                                <Typography variant="h2" sx={{ textAlign: "left" }}>Defensive statistics</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Tackes Won</Typography>
                                <Typography>{playerX.TklW}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Interceptions</Typography>
                                <Typography>{playerX.Int}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Tackles+Interceptions</Typography>
                                <Typography>{playerX["Tkl+Int"]}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Clearances</Typography>
                                <Typography>{playerX.Clr}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Errors leading to goals</Typography>
                                <Typography>{playerX.Err}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Tackles</Typography>
                                <Typography>{playerX.Tkl}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Ball Recoveries</Typography>
                                <Typography>{playerX.Recov}</Typography>
                            </Paper>
                            <Paper className="item full_width">
                                <Typography color="textSecondary" className="label">Yellow cards</Typography>
                                <Typography>{playerX.CrdY}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item full_width">
                                <Typography color="textSecondary" className="label">Red cards</Typography>
                                <Typography>{playerX.CrdR}</Typography>
                            </Paper>
                        </Paper>
                    </Box>

                    <Box sx={{ width: "50%" }}>
                        <Paper sx={{ padding: 2 }} variant={"outlined"} elevation={2} className="container">
                            <Paper variant="outlined" className="item name">
                                <Typography variant="h1" fontSize={{lg: "6rem", md: "5rem", sm: "3rem", xs:"1rem"}}>{playerY.Player}</Typography>
                            </Paper>
                            <Paper className="item squad">
                                <Typography color="textSecondary" className="label">team </Typography>
                                <Typography variant="h6">{playerY.Squad}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item Nation">
                                <Typography color="textSecondary" className="label">nation </Typography>
                                <Typography variant="h6">{playerY.Nation}</Typography>
                            </Paper>
                            <Paper className="item mp">
                                <Typography color="textSecondary" className="label">mp </Typography>
                                <Typography variant="h6">{playerY.MP}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item gls">
                                <Typography color="textSecondary" className="label">gls </Typography>
                                <Typography variant="h6">{playerY.Gls}</Typography>
                            </Paper>
                            <Paper className="item ast">
                                <Typography color="textSecondary" className="label">ast </Typography>
                                <Typography variant="h6">{playerY.Ast}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item pos">
                                <Typography color="textSecondary" className="label">pos </Typography>
                                <Typography variant="h6">{playerY.Pos}</Typography>
                            </Paper>
                            <Paper className="item comp">
                                <Typography color="textSecondary" className="label">comp </Typography>
                                <Typography variant="h6">{playerY.Comp}</Typography>
                            </Paper>
                        </Paper>

                        {playerYisGk ? (
                            <Paper sx={{ padding: 2, mt: 2 }} variant={"outlined"} elevation={2} className="advanced_stats_container goalkeeping">
                                <Paper variant="outlined" className="item full_width">
                                    <Typography variant="h2" sx={{ textAlign: "left" }}>Goalkeeping</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Goals Conceded</Typography>
                                    <Typography>{playerY.GA}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Goals Conceded/90</Typography>
                                    <Typography>{playerY.GA90}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Saves</Typography>
                                    <Typography>{playerY.Saves}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Save %</Typography>
                                    <Typography>{playerY["Save%"]}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Clean Sheets</Typography>
                                    <Typography>{playerY.CS}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">PSxG+/-</Typography>
                                    <Typography>{playerY["PSxG+/-"]}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Punches / Clears</Typography>
                                    <Typography>{playerY.Clr}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Errors</Typography>
                                    <Typography>{playerY.Err}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Pass %</Typography>
                                    <Typography>{playerY.Cmp}%</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Avg Pass Length</Typography>
                                    <Typography>{playerY.AvgLen}</Typography>
                                </Paper>
                                <Paper className="item">
                                    <Typography color="textSecondary" className="label">Throws</Typography>
                                    <Typography>{playerY.Thr}</Typography>
                                </Paper>
                                <Paper variant="outlined" className="item">
                                    <Typography color="textSecondary" className="label">Launch %</Typography>
                                    <Typography>{playerY["Launch%"]}%</Typography>
                                </Paper>
                            </Paper>
                        ) : null}

                        <Paper sx={{ padding: 2, mt: 2 }} variant={"outlined"} elevation={2} className="advanced_stats_container">
                            <Paper variant="outlined" className="item full_width">
                                <Typography variant="h2" sx={{ textAlign: "left" }}>Offensive statistics</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary">xg + xa</Typography>
                                <Typography>{playerY.xAG}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">xg </Typography>
                                <Typography>{playerY.xG}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">xa </Typography>
                                <Typography>{playerY.xA}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">ga </Typography>
                                <Typography>{playerY.GA}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">minutes </Typography>
                                <Typography>{playerY.Min}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">G-xG </Typography>
                                <Typography>{playerY["G-xG"]}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Kp </Typography>
                                <Typography>{playerY.KP}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">SCA </Typography>
                                <Typography>{playerY.SCA}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">GCA </Typography>
                                <Typography>{playerY.GCA}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">PrgC </Typography>
                                <Typography>{playerY.PrgC}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Carries </Typography>
                                <Typography>{playerY.Carries}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Touches </Typography>
                                <Typography>{playerY.Touches}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">non-penalty xG + xA </Typography>
                                <Typography>{playerY["npxG+xAG"]}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">sca90 </Typography>
                                <Typography>{playerY.SCA90}</Typography>
                            </Paper>

                            <Paper className="item full_width">
                                <Typography variant="h2" sx={{ textAlign: "left" }}>Defensive statistics</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Tackes Won</Typography>
                                <Typography>{playerY.TklW}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Interceptions</Typography>
                                <Typography>{playerY.Int}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Tackles+Interceptions</Typography>
                                <Typography>{playerY["Tkl+Int"]}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Clearances</Typography>
                                <Typography>{playerY.Clr}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Errors leading to goals</Typography>
                                <Typography>{playerY.Err}</Typography>
                            </Paper>
                            <Paper className="item">
                                <Typography color="textSecondary" className="label">Tackles</Typography>
                                <Typography>{playerY.Tkl}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item">
                                <Typography color="textSecondary" className="label">Ball Recoveries</Typography>
                                <Typography>{playerY.Recov}</Typography>
                            </Paper>
                            <Paper className="item full_width">
                                <Typography color="textSecondary" className="label">Yellow cards</Typography>
                                <Typography>{playerY.CrdY}</Typography>
                            </Paper>
                            <Paper variant="outlined" className="item full_width">
                                <Typography color="textSecondary" className="label">Red cards</Typography>
                                <Typography>{playerY.CrdR}</Typography>
                            </Paper>
                        </Paper>
                    </Box>

                </Box>
            </>
        );
    } else {
        return (
            <>  
                <Header navItems={[{ itemName: "S7FT", link: "/" }]}></Header>
                <Paper>no players found......</Paper>
            </>
        );
    }
}