import React, {useState} from 'react';
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
import {Box} from '@mui/material';
//Router
import { Link } from 'react-router';


export default function PlayerList() {
    const [inputName, setInputName] = useState("");
    const [queryParams, setQueryParams] = useState({player: "", offset: 0});
    const { players, isLoading, hasPreviousPage, hasNextPage } = usePlayers(queryParams);
    const [offsetForHook, setOffsetForHook] = useState(0);
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setQueryParams({player: inputName, offset: 0});
        setOffsetForHook(0);
    }
    function handleNextPage() {
      setOffsetForHook(offsetForHook+10);
      setQueryParams({player: inputName, offset: offsetForHook+10})
    }
         function handlePreviousPage() {
        setOffsetForHook(offsetForHook-10);
      setQueryParams({player: inputName, offset: offsetForHook-10})
      }
    return (
        <>
        
        <form onSubmit={handleSubmit}>
          <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", marginBottom: "10px", padding: "10px"}} spacing={2}>
            <TextField
              label="Player Name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Stack>
        </form>
      <TableContainer component={Paper} sx={{borderRadius: "10px"}}>
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
          
              <TableRow key={player.Rk}>
                
                  <TableCell component="th" scope="row" sx={{padding: 0}}>
                    <Box component={Link} to={"/player/"+player.Rk} sx={{padding: 2, display: "block", width: "100%", height: "inherit", color: "text.primary"}}>
                      {player.Player}
                    </Box>
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
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{width: "100%"}}>
                      <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                        <Button sx={{alignSelf: "left"}} disabled={!hasPreviousPage} onClick={handlePreviousPage}>previous page</Button>
                        <Button sx={{alignSelf: "right"}}  disabled={!hasNextPage} onClick={handleNextPage}>next page</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
        
      </Table>
    </TableContainer>
        </>
    )
}