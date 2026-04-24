import React, {useState} from 'react';
//hooks
import usePlayers from '../hooks/usePlayers';
import useAi from '../hooks/useAi';
import { Box } from '@mui/material';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';  
//Router
import { Link } from 'react-router';


export default function PlayerList() {
    const [inputGoals, setInputGoals] = useState(0);
    const [inputAssists, setInputAssists] = useState(0);
    const [queryParams, setQueryParams] = useState({gls: 0, ast: 0, offset: 0});
    const { players, isLoading, hasPreviousPage, hasNextPage } = usePlayers(queryParams);
    const [offsetForHook, setOffsetForHook] = useState(0);
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setQueryParams({gls:inputGoals, ast: inputAssists, offset: 0});
        setOffsetForHook(0);
    }
    function handleNextPage() {
      setOffsetForHook(offsetForHook+10);
      setQueryParams({gls: inputGoals, ast: inputAssists, offset: offsetForHook+10});
    }
    function handlePreviousPage() {
      setOffsetForHook(offsetForHook-10);
      setQueryParams({gls: inputGoals, ast: inputAssists, offset: offsetForHook-10})
    }
    return (
        <>
        <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", marginBottom: "10px", padding: "10px"}}>
          <form  onSubmit={handleSubmit}>
              <TextField
                label="Goals"
                variant="filled"
                value={inputGoals}
                onChange={(e) => setInputGoals(Number(e.target.value))}
              />
              <TextField
                label="Assists"
                variant="filled"
                value={inputAssists}
                onChange={(e) => setInputAssists(Number(e.target.value))}
              />
              <Button  type="submit" variant="contained"> Search</Button>
          </form>
        </Stack>

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
          
              <TableRow  key={player.Rk} to={"/player/"+player.Rk} component={Link}>
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
};