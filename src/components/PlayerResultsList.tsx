import type { ReactElement, ReactNode } from "react";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link } from "react-router";
import type { PlayerMinified } from "../types/types";

type PlayerListBehavior = { type: "nameLink" } | { type: "rowLink" } | { type: "select"; onPlayerSelect: (player: PlayerMinified) => void };
type PlayerResultsListProps = {
    players: PlayerMinified[];
    shouldShowEmptyState: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
    shouldShowRank: boolean;
    behavior: PlayerListBehavior;
    sx: SxProps<Theme>;
};

export default function PlayerResultsList({ players, shouldShowEmptyState, hasPreviousPage, hasNextPage, onPreviousPage, onNextPage, shouldShowRank, behavior, sx }: PlayerResultsListProps): ReactElement {
    const columnCount = shouldShowRank ? 4 : 3;
    const shouldLinkPlayerName = behavior.type === "nameLink";

    function renderPlayerName(player: PlayerMinified): ReactNode {
        if (!shouldLinkPlayerName) {
            return player.Player;
        }

        return (
            <Box component={Link} to={`/player/${player.Rk}`} sx={{ display: "block", width: "100%", height: "inherit", p: 2, color: "text.primary" }}>
                {player.Player}
            </Box>
        );
    }

    function renderPlayerCells(player: PlayerMinified): ReactElement {
        return (
            <>
                <TableCell component="th" scope="row" sx={shouldLinkPlayerName ? { p: 0 } : undefined}>{renderPlayerName(player)}</TableCell>
                <TableCell align="right">{player.Age}</TableCell>
                <TableCell align="right">{player.Squad}</TableCell>
                {shouldShowRank && <TableCell align="right">{player.Rk}</TableCell>}
            </>
        );
    }

    function renderPlayerRow(player: PlayerMinified): ReactElement {
        const playerCells = renderPlayerCells(player);

        if (behavior.type === "rowLink") {
            return <TableRow key={player.Rk} component={Link} to={`/player/${player.Rk}`}>{playerCells}</TableRow>;
        }

        if (behavior.type === "select") {
            return <TableRow key={player.Rk} sx={{ cursor: "pointer" }} onClick={() => behavior.onPlayerSelect(player)}>{playerCells}</TableRow>;
        }

        return <TableRow key={player.Rk}>{playerCells}</TableRow>;
    }

    return (
        <Table sx={sx} aria-label="player list">
            <TableHead>
                <TableRow>
                    <TableCell>Player</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">squad</TableCell>
                    {shouldShowRank && <TableCell align="right">rk</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player) => renderPlayerRow(player))}
                {shouldShowEmptyState && players.length === 0 && <TableRow><TableCell colSpan={columnCount} align="center">No players found</TableCell></TableRow>}
            </TableBody>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={columnCount} sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                            <Button disabled={!hasPreviousPage} onClick={onPreviousPage}>previous page</Button>
                            <Button disabled={!hasNextPage} onClick={onNextPage}>next page</Button>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
