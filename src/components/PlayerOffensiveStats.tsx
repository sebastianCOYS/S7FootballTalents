import { Typography } from '@mui/material';
import { Paper, Box } from '@mui/material';
import type { playerComplete } from '../types/playerComplete';
export default function PlayerOffensiveStats(player: playerComplete) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item full_width">
                <Typography variant="h3" sx={{ textAlign: "left" }} >Attacking</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary">xg + xa</Typography>
                <Typography>{player.xAG}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">xg </Typography>
                <Typography>{player.xG}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">xa </Typography>
                <Typography>{player.xA}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">ga </Typography>
                <Typography>{player.GA}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">minutes </Typography>
                <Typography>{player.Min}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">G-xG </Typography>
                <Typography>{player["G-xG"]}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">Kp </Typography>
                <Typography>{player.KP}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">SCA </Typography>
                <Typography>{player.SCA}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">GCA </Typography>
                <Typography>{player.GCA}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">PrgC </Typography>
                <Typography>{player.PrgC}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">Carries </Typography>
                <Typography>{player.Carries}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Touches </Typography>
                <Typography>{player.Touches}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item">
                <Typography color="textSecondary" className="label">non-penalty xG + xA </Typography>
                <Typography>{player["npxG+xAG"]}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">sca90 </Typography>
                <Typography>{player.SCA90}</Typography>
            </Paper>
        </Box>
    );
}
