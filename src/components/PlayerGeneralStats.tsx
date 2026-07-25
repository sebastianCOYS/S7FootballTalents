import { Typography } from '@mui/material';
import { Paper, Chip } from '@mui/material';
import type { playerComplete } from '../types/playerComplete';
import spainFlag from "../images/spainflag.png";
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
export default function PlayerGeneralStats({ player, profileTag, roleFit }: PlayerGeneralStatsProps) {
    return (
        <>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item name">
                <Typography variant="h2">{player.Player}</Typography>
                {profileTag && roleFit ? <><Typography variant="h6">preferred role:</Typography><Chip color="warning" variant="outlined" label={profileTag} /><Typography variant="h6">preferred system:</Typography><Chip color="warning" label={roleFit} /></> : null}
            </Paper>

            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item squad">
                <Typography color="textSecondary" className="label">team </Typography>
                <Typography variant="h6">{player.Squad}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item Nation">
                <Typography color="textSecondary" className="label">nation </Typography>
                <Typography variant="h6">{player.Nation === "es ESP" ? <img height={"32px"} src={spainFlag} alt="spain" title="spain" /> : player.Nation}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item Nation">
                <Typography color="textSecondary" className="label">Birth year</Typography>
                <Typography variant="h6">{player.Born}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item mp">
                <Typography color="textSecondary" className="label">mp </Typography>
                <Typography variant="h6">{player.MP}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item gls">
                <Typography color="textSecondary" className="label">gls </Typography>
                <Typography variant="h6">{player.Gls}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item ast">
                <Typography color="textSecondary" className="label">ast </Typography>
                <Typography variant="h6">{player.Ast}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} className="item pos">
                <Typography color="textSecondary" className="label">pos </Typography>
                <Typography variant="h6">{player.Pos}</Typography>
            </Paper>
            <Paper sx={{ borderRadius: "20px", p: 2 }} variant="outlined" className="item comp">
                <Typography color="textSecondary" className="label">comp </Typography>
                <Typography variant="h6">{player.Comp}</Typography>
            </Paper>
        </>
    );
}
