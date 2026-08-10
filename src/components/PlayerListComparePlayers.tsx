import { useState, type ReactElement } from "react";
import { Alert, Box, Paper, TableContainer } from "@mui/material";
import usePlayerSearch from "../hooks/usePlayerSearch";
import type { PlayerMinified } from "../types/types";
import PlayerNameSearchForm from "./PlayerNameSearchForm";
import PlayerResultsList from "./PlayerResultsList";
import PlayerComparisonSelection from "./PlayerComparisonSelection";

const initialFilters = { player: "", offset: 0 };

export default function PlayerListComparePlayers(): ReactElement {
  const firstPlayerSearch = usePlayerSearch(initialFilters);
  const secondPlayerSearch = usePlayerSearch(initialFilters);
  const [selectedFirstPlayer, setSelectedFirstPlayer] = useState<PlayerMinified | null>(null);
  const [selectedSecondPlayer, setSelectedSecondPlayer] = useState<PlayerMinified | null>(null);

  const comparisonSearchForms = (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center" }}>
      <PlayerNameSearchForm label="Name of player X" playerName={firstPlayerSearch.draftFilters.player} onPlayerNameChange={(playerName) => firstPlayerSearch.setDraftFilters({ ...firstPlayerSearch.draftFilters, player: playerName })} onSubmit={firstPlayerSearch.handleSubmit} shouldUseCompactButton={true} />
      <PlayerNameSearchForm label="Name of player Y" playerName={secondPlayerSearch.draftFilters.player} onPlayerNameChange={(playerName) => secondPlayerSearch.setDraftFilters({ ...secondPlayerSearch.draftFilters, player: playerName })} onSubmit={secondPlayerSearch.handleSubmit} shouldUseCompactButton={true} />
    </Box>
  );

  if (firstPlayerSearch.isLoading || secondPlayerSearch.isLoading) {
    return (
      <>
        {comparisonSearchForms}
        <Box sx={{ height: "900px", borderRadius: "20px" }} />
      </>
    );
  }

  return (
    <>
      {comparisonSearchForms}
      {firstPlayerSearch.error !== null && <Alert severity="error" sx={{ mb: 2 }}>Could not load Player X results: {firstPlayerSearch.error}</Alert>}
      {secondPlayerSearch.error !== null && <Alert severity="error" sx={{ mb: 2 }}>Could not load Player Y results: {secondPlayerSearch.error}</Alert>}
      <TableContainer component={Paper} sx={{ display: "flex", flexDirection: "row", gap: 12, borderRadius: "10px" }}>
        <PlayerResultsList players={firstPlayerSearch.players} shouldShowEmptyState={firstPlayerSearch.error === null} behavior={{ type: "select", onPlayerSelect: setSelectedFirstPlayer }} shouldShowRank={false} sx={{ minWidth: 150, height: "900px" }}
          hasPreviousPage={firstPlayerSearch.hasPreviousPage} hasNextPage={firstPlayerSearch.hasNextPage} onPreviousPage={firstPlayerSearch.handlePreviousPage} onNextPage={firstPlayerSearch.handleNextPage} />
        <PlayerComparisonSelection firstPlayer={selectedFirstPlayer} secondPlayer={selectedSecondPlayer} />
        <PlayerResultsList players={secondPlayerSearch.players} shouldShowEmptyState={secondPlayerSearch.error === null} behavior={{ type: "select", onPlayerSelect: setSelectedSecondPlayer }} shouldShowRank={false} sx={{ minWidth: 150 }}
          hasPreviousPage={secondPlayerSearch.hasPreviousPage} hasNextPage={secondPlayerSearch.hasNextPage} onPreviousPage={secondPlayerSearch.handlePreviousPage} onNextPage={secondPlayerSearch.handleNextPage} />
      </TableContainer>
    </>
  );
}
