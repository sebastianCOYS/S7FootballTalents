import type { ReactElement } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import type { PlayerMinified } from "../types/types";

type PlayerComparisonSelectionProps = { firstPlayer: PlayerMinified | null; secondPlayer: PlayerMinified | null };

export default function PlayerComparisonSelection({ firstPlayer, secondPlayer }: PlayerComparisonSelectionProps): ReactElement {
    let firstPlayerName = "no player X selected";
    let secondPlayerName = "no player Y selected";

    if (firstPlayer !== null) {
        firstPlayerName = firstPlayer.Player;
    }

    if (secondPlayer !== null) {
        secondPlayerName = secondPlayer.Player;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{firstPlayerName}</Typography>
            <Divider />
            <Typography variant="h6">{secondPlayerName}</Typography>
            {firstPlayer !== null && secondPlayer !== null && <Button component={Link} to={`/player_comparison/${firstPlayer.Rk}/${secondPlayer.Rk}`} variant="outlined" sx={{ borderRadius: "20px", mt: 2, border: "3px solid" }}>Compare Players</Button>}
        </Box>
    );
}
