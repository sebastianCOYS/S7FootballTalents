import {useParams} from "react-router";
import usePlayer from "../hooks/usePlayer";
import {Typography} from "@mui/material"
import Header from "../components/Header";
import {Paper} from "@mui/material";
import useAi from "../hooks/useAi";
import {Button} from "@mui/material";
import {Chip} from "@mui/material";
import {Box} from "@mui/material";
export default function PlayerPage() {
    const {playerRk} = useParams();
    const {player, error, isLoading}  = usePlayer(Number(playerRk));   
    const {summary, nickname, rating, isLoading: isLoadingAi, error: errorAi, apiLimitReached, generateAiPlayerSummary } = useAi(player);


    if (error != null) {
        return (
            <>
            <p>something went wrong...</p>
            </>
        );
    }
    if(isLoading) {
        return (
            <>
            <p>still loading...</p>
            </>
        );
    }
    if (player != null) {
        const isGk = player.Pos === "GK";
        return (<>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Paper sx={{padding: 2}} variant={"outlined"} className="container">
            <Button sx={{width: "100%", my: 1}} disabled={apiLimitReached ? apiLimitReached : isLoadingAi} variant="contained" color="warning" onClick={generateAiPlayerSummary}>{isLoadingAi ? "loading..." : "AI analyze player"}</Button>
            <Paper sx={{p: 2}}>
                <Typography sx={{minHeight: "100px"}}>{summary ? summary : errorAi}</Typography>
            </Paper>
            <Paper variant="outlined" className="item name">
                <Typography variant="h1">{player.Player}</Typography>
                <Box  sx={{display: "flex", flexDirection: "row", alignItems: "center", gap:1, m: 2}}>
                    <Typography variant="h6">AI nickname:</Typography>
                    <Chip color="warning" variant="outlined" label={nickname ? nickname : "AI nickname"} />
                    <Typography variant="h6">AI rating:</Typography>
                    <Chip color="warning" label={rating ? `${rating}/99` : "AI rating"} />
                </Box>
            </Paper>
            <Paper className="item squad">
                <Typography color="textSecondary" className="label">team </Typography>
                <Typography variant="h6">{player.Squad}</Typography>
            </Paper>
            <Paper variant="outlined" className="item Nation">
                <Typography color="textSecondary" className="label">nation </Typography>
                <Typography variant="h6">{player.Nation}</Typography>
            </Paper>
            <Paper className="item mp">
                <Typography color="textSecondary" className="label">mp </Typography>
                <Typography variant="h6">{player.MP}</Typography>
            </Paper>
            <Paper variant="outlined" className="item gls">
                <Typography color="textSecondary" className="label">gls </Typography>
                <Typography variant="h6">{player.Gls}</Typography>
            </Paper>
            <Paper className="item ast">
                <Typography color="textSecondary" className="label">ast </Typography>
                <Typography variant="h6">{player.Ast}</Typography>
            </Paper>
            <Paper variant="outlined" className="item pos">
                <Typography color="textSecondary" className="label">pos </Typography>
                <Typography variant="h6">{player.Pos}</Typography>
            </Paper>
            <Paper className="item comp">
                <Typography color="textSecondary" className="label">comp </Typography>
                <Typography variant="h6">{player.Comp}</Typography>
            </Paper>
        </Paper>
         {/* if its a goalkeeper, render goalkeeper stats */}
        {isGk ?
        <Paper sx={{padding: 2}} variant={"outlined"} className="advanced_stats_container goalkeeping">
            <Paper variant="outlined" className="item full_width">
                <Typography variant="h2"  sx={{textAlign: "left"}} >Goalkeeping</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Goals Conceded</Typography>
                <Typography>{player.GA}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Goals Conceded/90</Typography>
                <Typography>{player.GA90}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Saves</Typography>
                <Typography>{player.Saves}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Save %</Typography>
                <Typography>{player["Save%"]}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Clean Sheets</Typography>
                <Typography>{player.CS}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">PSxG+/-</Typography>
                <Typography>{player["PSxG+/-"]}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Punches / Clears</Typography>
                <Typography>{player.Clr}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Errors</Typography>
                <Typography>{player.Err}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Pass %</Typography>
                <Typography>{player.Cmp}%</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Avg Pass Length</Typography>
                <Typography>{player.AvgLen}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Throws</Typography>
                <Typography>{player.Thr}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Launch %</Typography>
                <Typography>{player["Launch%"]}%</Typography>
            </Paper>
      </Paper>
       : null}
        <Paper sx={{padding: 2}} variant={"outlined"} className="advanced_stats_container">
            <Paper variant="outlined" className="item full_width">
                <Typography variant="h2"  sx={{textAlign: "left"}} >Offensive statistics</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary">xg + xa</Typography>
                <Typography>{player.xAG}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">xg </Typography>
                <Typography>{player.xG}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">xa </Typography>
                <Typography>{player.xA}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">ga </Typography>
                <Typography>{player.GA}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">minutes </Typography>
                <Typography>{player.Min}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">G-xG </Typography>
                <Typography>{player["G-xG"]}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Kp </Typography>
                <Typography>{player.KP}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">SCA </Typography>
                <Typography>{player.SCA}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">GCA </Typography>
                <Typography>{player.GCA}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">PrgC </Typography>
                <Typography>{player.PrgC}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Carries </Typography>
                <Typography>{player.Carries}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Touches </Typography>
                <Typography>{player.Touches}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">non-penalty xG + xA </Typography>
                <Typography>{player["npxG+xAG"]}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">sca90 </Typography>
                <Typography>{player.SCA90}</Typography>
            </Paper>
            <Paper className="item full_width">
                <Typography variant="h2"  sx={{textAlign: "left"}} >Defensive statistics</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Tackes Won</Typography>
                <Typography>{player.TklW}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Interceptions</Typography>
                <Typography>{player.Int}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Tackles+Interceptions</Typography>
                <Typography>{player["Tkl+Int"]}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Clearances</Typography>
                <Typography>{player.Clr}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Errors leading to goals</Typography>
                <Typography>{player.Err}</Typography>
            </Paper>
            <Paper className="item">
                <Typography color="textSecondary" className="label">Tackles</Typography>
                <Typography>{player.Tkl}</Typography>
            </Paper>
            <Paper variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Ball Recoveries</Typography>
                <Typography>{player.Recov}</Typography>
            </Paper>
            <Paper className="item full_width">
                <Typography color="textSecondary" className="label">Yellow cards</Typography>
                <Typography>{player.CrdY}</Typography>
            </Paper>
            <Paper variant="outlined" className="item full_width">
                <Typography color="textSecondary" className="label">Red cards</Typography>
                <Typography>{player.CrdR}</Typography>
            </Paper>
        </Paper>
        </> 
        )
    } else {
        return (<Paper>no player found......</Paper>);
    }
}