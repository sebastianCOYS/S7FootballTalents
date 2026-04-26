import { Typography } from '@mui/material';
import {Paper} from '@mui/material';
import type {playerCompleteType} from '../types/playerComplete';

export default function PlayerDefensiveStats(player: playerCompleteType) {
  return (
    <>
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
          </>
  );
}
