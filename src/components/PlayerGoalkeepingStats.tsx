import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import type { playerComplete } from '../types/playerComplete';

type PlayerGoalkeepingStatsProps = Pick<playerComplete, "Pos" | "GA90" | "Save%" | "CS" | "Err" | "Cmp%" | "AvgLen">;

export default function PlayerGoalkeepingStats(player: PlayerGoalkeepingStatsProps) {
    if (player.Pos === "GK") {
        return (
            <>
                <Paper variant="outlined" sx={{ width: "100%", p: 3, borderRadius: "20px" }}>
                    <Typography>Goalkeeping</Typography>
                </Paper>
                <Paper sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, borderRadius: "20px" }}>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }}>
                        <Typography color="textSecondary">Goals Conceded/90</Typography>
                        <Typography>{player.GA90}</Typography>
                    </Paper>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined">
                        <Typography color="textSecondary">Save %</Typography>
                        <Typography>{player["Save%"]}</Typography>
                    </Paper>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }}>
                        <Typography color="textSecondary">Clean Sheets</Typography>
                        <Typography>{player.CS}</Typography>
                    </Paper>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined">
                        <Typography color="textSecondary">Errors</Typography>
                        <Typography>{player.Err}</Typography>
                    </Paper>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }}>
                        <Typography color="textSecondary">Pass %</Typography>
                        <Typography>{player["Cmp%"]}%</Typography>
                    </Paper>
                    <Paper sx={{ borderRadius: "20px", p: 2, width: "100%" }} variant="outlined">
                        <Typography color="textSecondary">Avg Pass Length</Typography>
                        <Typography>{player.AvgLen}</Typography>
                    </Paper>
                </Paper>
            </>
        );
    }

}
