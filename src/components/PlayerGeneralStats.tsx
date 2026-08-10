import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import type { playerComplete } from '../types/playerComplete';
type insight = {
    label: string,
    evidence: string,
    interpretation: string
}
type PlayerGeneralStatsProps = {
    player: playerComplete,
    profileTag?: string | null,
    roleFit?: string | null
    insights?: insight[] | null
}
export default function PlayerGeneralStats({ player }: PlayerGeneralStatsProps) {
    return (
        <>
            <Paper variant="outlined" sx={{ width: "100%", p: 3, borderRadius: "20px" }}>
                <Typography variant="h2">{player.Player}</Typography>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, borderRadius: "20px" }}>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} className="item Nation">
                    <Typography color="textSecondary" className="label">Birth year</Typography>
                    <Typography variant="h6">{player.Born}</Typography>
                </Paper>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined" className="item mp">
                    <Typography color="textSecondary" className="label">Minutes </Typography>
                    <Typography variant="h6">{player.Min}</Typography>
                </Paper>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} className="item gls">
                    <Typography color="textSecondary" className="label">goals </Typography>
                    <Typography variant="h6">{player.Gls}</Typography>
                </Paper>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined" className="item ast">
                    <Typography color="textSecondary" className="label">assists </Typography>
                    <Typography variant="h6">{player.Ast}</Typography>
                </Paper>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} className="item pos">
                    <Typography color="textSecondary" className="label">position </Typography>
                    <Typography variant="h6">{player.Pos}</Typography>
                </Paper>
                <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined" className="item comp">
                    <Typography color="textSecondary" className="label">competition </Typography>
                    <Typography variant="h6">{player.Comp}</Typography>
                </Paper>
            </Paper>

        </>
    );
}
