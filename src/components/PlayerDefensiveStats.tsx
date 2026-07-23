import { Typography } from '@mui/material';
import {Paper} from '@mui/material';
import type {playerComplete} from '../types/playerComplete';

export default function PlayerDefensiveStats(player: playerComplete) {
  return (
    <>
    <Paper sx={{borderRadius: "20px", p: 2}} className="item full_width">
                <Typography variant="h3"  sx={{textAlign: "left"}} >Defending</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Tackes Won</Typography>
                <Typography>{player.TklW}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} className="item">
                <Typography color="textSecondary" className="label">Interceptions</Typography>
                <Typography>{player.Int}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Tackles+Interceptions</Typography>
                <Typography>{player["Tkl+Int"]}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} className="item">
                <Typography color="textSecondary" className="label">Clearances</Typography>
                <Typography>{player.Clr}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Errors leading to goals</Typography>
                <Typography>{player.Err}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} className="item">
                <Typography color="textSecondary" className="label">Tackles</Typography>
                <Typography>{player.Tkl}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} variant="outlined" className="item">
                <Typography color="textSecondary" className="label">Ball Recoveries</Typography>
                <Typography>{player.Recov}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} className="item full_width">
                <Typography color="textSecondary" className="label">Yellow cards</Typography>
                <Typography>{player.CrdY}</Typography>
            </Paper>
            <Paper sx={{borderRadius: "20px", p: 2}} variant="outlined" className="item full_width">
                <Typography color="textSecondary" className="label">Red cards</Typography>
                <Typography>{player.CrdR}</Typography>
            </Paper>
          </>
  );
}
