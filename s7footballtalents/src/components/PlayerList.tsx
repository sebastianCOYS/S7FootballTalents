import React, {useState, useEffect} from 'react';
import usePlayers from '../hooks/usePlayers';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { Player } from '../hooks/usePlayers';


export default function PlayerList() {
    const [inputGoals, setInputGoals] = useState(0);
    const [inputAssists, setInputAssists] = useState(0);

    const [queryParams, setQueryParams] = useState({gls: 0, ast: 0});
    const { players, isLoading } = usePlayers(queryParams);
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setQueryParams({gls:inputGoals, ast: inputAssists});
    }
    return (
        <>
        <h1>Search for players</h1>
        
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputGoals} placeholder="goals" onChange={(e) => setInputGoals(Number(e.target.value))}/>
            <input type="text" value={inputAssists} placeholder="assists" onChange={(e) => setInputAssists(Number(e.target.value))}/>
            <input type="submit" />
        </form>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableRow
              key={player.Rk}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.Player}
              </TableCell>
              <TableCell align="right">{player.Age}</TableCell>
              <TableCell align="right">{player.Squad}</TableCell>
              <TableCell align="right">{player.Rk}</TableCell>
            </TableRow>
          ))}
           {!isLoading && players.length === 0 && (
             <TableRow>
                <TableCell colSpan={4} align="center">
                    No players found
                </TableCell>
            </TableRow>
           )}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
};