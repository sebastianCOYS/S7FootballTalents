import React, { useState } from 'react';
import usePlayers from '../hooks/usePlayers';
import type { PlayerMinified } from '../types/types';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Typography, Divider } from '@mui/material';
//mui form
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//Router
import { Link } from 'react-router';

export default function ComparePlayers() {
  const [draftFiltersX, setDraftFiltersX] = useState({ player: "", offset: 0 });
  const [draftFiltersY, setDraftFiltersY] = useState({ player: "", offset: 0 });
  const [appliedFiltersX, setAppliedFiltersX] = useState({ player: "", offset: 0 });
  const [appliedFiltersY, setAppliedFiltersY] = useState({ player: "", offset: 0 });
  const { players: playersX, error: errorX, isLoading: isLoadingX, hasPreviousPage: hasPreviousPageX, hasNextPage: hasNextPageX } = usePlayers(appliedFiltersX);
  const { players: playersY, error: errorY, isLoading: isLoadingY, hasPreviousPage: hasPreviousPageY, hasNextPage: hasNextPageY } = usePlayers(appliedFiltersY);
  const [selectedPlayerXName, setSelectedPlayerXName] = useState("no player X selected");
  const [selectedPlayerXRk, setSelectedPlayerXRk] = useState<null | number>(null);
  const [selectedPlayerYName, setSelectedPlayerYName] = useState("no player Y selected");
  const [selectedPlayerYRk, setSelectedPlayerYRk] = useState<null | number>(null);


  function handleSubmitX(e: React.FormEvent) {
    e.preventDefault();
    setAppliedFiltersX({ ...draftFiltersX, offset: 0 });
  }
  function handleSubmitY(e: React.FormEvent) {
    e.preventDefault();
    setAppliedFiltersY({ ...draftFiltersY, offset: 0 });
  }


  function handleNextPageX() {
    setAppliedFiltersX(previous => ({ ...previous, offset: previous.offset + 10 }));
  }

  function handleNextPageY() {
    setAppliedFiltersY(previous => ({ ...previous, offset: previous.offset + 10 }));
  }
  function handlePreviousPageX() {
    setAppliedFiltersX(previous => ({ ...previous, offset: Math.max(0, previous.offset - 10) }));
  }

  function handlePreviousPageY() {
    setAppliedFiltersY(previous => ({ ...previous, offset: Math.max(0, previous.offset - 10) }));
  }

  function handlePlayerXSelected(player: PlayerMinified) {
    setSelectedPlayerXName(player.Player);
    setSelectedPlayerXRk(player.Rk);
  }

  function handlePlayerYSelected(player: PlayerMinified) {
    setSelectedPlayerYName(player.Player);
    setSelectedPlayerYRk(player.Rk);
  }

  if (isLoadingX || isLoadingY) return <>
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <form onSubmit={handleSubmitX}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
          <TextField
            label="Name of player X"
            slotProps={{ input: { style: { borderRadius: "20px" } } }}
            value={draftFiltersX.player}
            onChange={(e) => setDraftFiltersX(previous => ({ ...previous, player: e.target.value }))}
          />
          <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
      <form onSubmit={handleSubmitY}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
          <TextField
            label="Name of player Y"
            slotProps={{ input: { style: { borderRadius: "20px" } } }}
            value={draftFiltersY.player}
            onChange={(e) => setDraftFiltersY(previous => ({ ...previous, player: e.target.value }))}
          />
          <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
    </Box>

    {/* to match the height of the table when its filled in.(illusion) */}
    <Box sx={{ height: "900px", borderRadius: "20px" }}>
    </Box>
  </>;
  return (<>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center" }}>
      <form onSubmit={handleSubmitX}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
          <TextField
            label="Name of player X"
            slotProps={{ input: { style: { borderRadius: "20px" } } }}
            value={draftFiltersX.player}
            onChange={(e) => setDraftFiltersX(previous => ({ ...previous, player: e.target.value }))}
          />
          <Button sx={{ borderRadius: "20px", fontSize: { xs: "0.75rem", sm: "1.25rem" } }} type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>

      <form onSubmit={handleSubmitY}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", mb: 2, p: 2 }} spacing={2}>
          <TextField
            label="Name of player Y"
            slotProps={{ input: { style: { borderRadius: "20px" } } }}
            value={draftFiltersY.player}
            onChange={(e) => setDraftFiltersY(previous => ({ ...previous, player: e.target.value }))}
          />
          <Button sx={{ borderRadius: "20px", fontSize: { xs: "0.75rem", sm: "1.25rem" } }} type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
    </Box>
    {errorX && (
      <Alert severity="error" sx={{ mb: 2 }}>
        Could not load Player X results: {errorX}
      </Alert>
    )}
    {errorY && (
      <Alert severity="error" sx={{ mb: 2 }}>
        Could not load Player Y results: {errorY}
      </Alert>
    )}
    <TableContainer sx={{ borderRadius: "10px", display: "flex", flexDirection: "row", gap: 12 }} component={Paper}>
      <Table sx={{ minWidth: 150, height: "900px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">squad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {playersX.map((player) => (

            <TableRow sx={{ cursor: "pointer" }} key={player.Rk} onClick={() => handlePlayerXSelected(player)}>
              <TableCell component="th" scope="row">
                {player.Player}
              </TableCell>
              <TableCell align="right">{player.Age}</TableCell>
              <TableCell align="right">{player.Squad}</TableCell>
            </TableRow>

          ))}
          {!isLoadingX && !errorX && playersX.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No players found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <Button sx={{ alignSelf: "left" }} disabled={!hasPreviousPageX} onClick={handlePreviousPageX}>previous page</Button>
                <Button sx={{ alignSelf: "right" }} disabled={!hasNextPageX} onClick={handleNextPageX}>next page</Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>

      </Table>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ mb: 2 }} variant={"h6"}>{selectedPlayerXName}</Typography>
        <Divider></Divider>
        <Typography variant={"h6"}>{selectedPlayerYName}</Typography>
        {
          selectedPlayerXRk !== null && selectedPlayerYRk !== null &&
          <Button variant="outlined" sx={{ borderRadis: "20px", mt: 2, border: "3px solid" }} component={Link} to={"/player_comparison/" + selectedPlayerXRk + "/" + selectedPlayerYRk}>Compare Players</Button>
        }
      </Box>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">squad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {playersY.map((player) => (

            <TableRow key={player.Rk} onClick={() => handlePlayerYSelected(player)} sx={{ cursor: "pointer" }}>
              <TableCell component="th" scope="row">
                {player.Player}
              </TableCell>
              <TableCell align="right">{player.Age}</TableCell>
              <TableCell align="right">{player.Squad}</TableCell>
            </TableRow>

          ))}
          {!isLoadingY && !errorY && playersY.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No players found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <Button sx={{ alignSelf: "left" }} disabled={!hasPreviousPageY} onClick={handlePreviousPageY}>previous page</Button>
                <Button sx={{ alignSelf: "right" }} disabled={!hasNextPageY} onClick={handleNextPageY}>next page</Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </TableContainer>
  </>)
}
