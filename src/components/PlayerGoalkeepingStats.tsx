import React from 'react';
import { Box, Typography } from '@mui/material';
import {Paper} from '@mui/material';
import type { playerCompleteType } from '../types/playerComplete';
export default function PlayerGoalkeepingStats(player: playerCompleteType) {
  if (player.Pos === "gk") {
     return (
    <Paper sx={{padding: 2}} variant={"outlined"} className="advanced_stats_container goalkeeping">
            <Paper variant="outlined" className="item full_width">
                <Typography variant="h3"  sx={{textAlign: "left"}} >Goalkeeping</Typography>
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
  );
  }
 
}
