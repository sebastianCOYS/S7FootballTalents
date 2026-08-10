import type { ReactElement } from "react";
import { Alert, Box, Paper, TableContainer } from "@mui/material";
import usePlayerSearch from "../hooks/usePlayerSearch";
import AdvancedPlayerSearchForm from "./AdvancedPlayerSearchForm";
import type { AdvancedPlayerFilters } from "./AdvancedPlayerSearchForm";
import PlayerResultsList from "./PlayerResultsList";

const initialFilters: AdvancedPlayerFilters = { player: "", league: "", gls: 0, ast: 0, offset: 0, position: "ANY", mp: 0, age: 0, prgc: 0, prgp: 0, xG: 0, xA: 0 };

export default function AdvancedPlayerList(): ReactElement {
  const playerSearch = usePlayerSearch(initialFilters);

  if (playerSearch.isLoading) {
    return (
      <>
        <AdvancedPlayerSearchForm filters={playerSearch.draftFilters} onFiltersChange={playerSearch.setDraftFilters} onSubmit={playerSearch.handleSubmit} />
        <Box sx={{ height: "800px", backgroundColor: "background.paper", borderRadius: "20px" }} />
      </>
    );
  }

  return (
    <>
      <AdvancedPlayerSearchForm filters={playerSearch.draftFilters} onFiltersChange={playerSearch.setDraftFilters} onSubmit={playerSearch.handleSubmit} />
      {playerSearch.error !== null && <Alert severity="error" sx={{ mb: 2 }}>Could not load players: {playerSearch.error}</Alert>}
      <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
        <PlayerResultsList players={playerSearch.players} shouldShowEmptyState={playerSearch.error === null} behavior={{ type: "rowLink" }} shouldShowRank={true} sx={{ minWidth: 650, minHeight: "800px !important" }}
          hasPreviousPage={playerSearch.hasPreviousPage} hasNextPage={playerSearch.hasNextPage} onPreviousPage={playerSearch.handlePreviousPage} onNextPage={playerSearch.handleNextPage} />
      </TableContainer>
    </>
  );
}
