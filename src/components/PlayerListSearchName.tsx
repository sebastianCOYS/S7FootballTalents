import React, { useState } from 'react';
import usePlayers from '../hooks/usePlayers';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//mui form
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Alert, Box } from '@mui/material';
//Router
import { Link } from 'react-router';


export default function PlayerList() {
  const [draftFilters, setDraftFilters] = useState({ player: "", offset: 0 });
  const [appliedFilters, setAppliedFilters] = useState({ player: "", offset: 0 });
  const { players, error, isLoading, hasPreviousPage, hasNextPage } = usePlayers(appliedFilters);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAppliedFilters({ ...draftFilters, offset: 0 });
  }
  function handleNextPage() {
    setAppliedFilters(previous => ({ ...previous, offset: previous.offset + 10 }));
  }
  function handlePreviousPage() {
    setAppliedFilters(previous => ({ ...previous, offset: Math.max(0, previous.offset - 10) }));
  }

  if (isLoading) return <>
    <form onSubmit={handleSubmit}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
        <TextField
          label="Player Name"
          slotProps={{ input: { style: { borderRadius: "20px" } } }}
          value={draftFilters.player}
          onChange={(e) => setDraftFilters(previous => ({ ...previous, player: e.target.value }))}
        />
        <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained">
          Search
        </Button>
      </Stack>
    </form>
    <Box sx={{ height: "800px", borderRadius: "20px" }}></Box>
  </>;

  return (
    <>

      <form onSubmit={handleSubmit}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
          <TextField
            label="Player Name"
            slotProps={{ input: { style: { borderRadius: "20px" } } }}
            value={draftFilters.player}
            onChange={(e) => setDraftFilters(previous => ({ ...previous, player: e.target.value }))}
          />
          <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Could not load players: {error}
        </Alert>
      )}
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table sx={{ minWidth: 650, minHeight: "800px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">squad</TableCell>
              <TableCell align="right">rk</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {players.map((player) => (

              <TableRow key={player.Rk}>

                <TableCell component="th" scope="row" sx={{ padding: 0 }}>
                  <Box component={Link} to={"/player/" + player.Rk} sx={{ padding: 2, display: "block", width: "100%", height: "inherit", color: "text.primary" }}>
                    {player.Player}
                  </Box>
                </TableCell>
                <TableCell align="right">{player.Age}</TableCell>
                <TableCell align="right">{player.Squad}</TableCell>
                <TableCell align="right">{player.Rk}</TableCell>
              </TableRow>

            ))}
            {!isLoading && !error && players.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No players found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                  <Button sx={{ alignSelf: "left" }} disabled={!hasPreviousPage} onClick={handlePreviousPage}>previous page</Button>
                  <Button sx={{ alignSelf: "right" }} disabled={!hasNextPage} onClick={handleNextPage}>next page</Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </TableContainer>
    </>
  )
}
