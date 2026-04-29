import React from 'react';
import { Box, Typography } from '@mui/material';
import {Button, Paper, Chip} from '@mui/material';
import type { playerCompleteType } from '../types/playerComplete';
type PlayerGeneralStatsProps = {
  player: playerCompleteType,
  rating?: string | null,
  nickname?: string | null
}
export default function PlayerGeneralStats({player, rating, nickname} : PlayerGeneralStatsProps) {
  return (
        <Paper sx={{padding: 2}} variant={"outlined"} className="container">
        <Paper variant="outlined" className="item name">
            <Typography variant="h3">{player.Player}</Typography>
            <Box  sx={{display: "flex", flexDirection: "row", alignItems: "center", gap:1, m: 2, flexWrap: "wrap"}}>
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
         <Paper className="item Nation">
            <Typography color="textSecondary" className="label">Birth year</Typography>
            <Typography variant="h6">{player.Born}</Typography>
        </Paper>
        <Paper variant="outlined" className="item mp">
            <Typography color="textSecondary" className="label">mp </Typography>
            <Typography variant="h6">{player.MP}</Typography>
        </Paper>
        <Paper className="item gls">
            <Typography color="textSecondary" className="label">gls </Typography>
            <Typography variant="h6">{player.Gls}</Typography>
        </Paper>
        <Paper variant="outlined" className="item ast">
            <Typography color="textSecondary" className="label">ast </Typography>
            <Typography variant="h6">{player.Ast}</Typography>
        </Paper>
        <Paper className="item pos">
            <Typography color="textSecondary" className="label">pos </Typography>
            <Typography variant="h6">{player.Pos}</Typography>
        </Paper>
        <Paper variant="outlined" className="item comp">
            <Typography color="textSecondary" className="label">comp </Typography>
            <Typography variant="h6">{player.Comp}</Typography>
        </Paper>
    </Paper>
  );
}
