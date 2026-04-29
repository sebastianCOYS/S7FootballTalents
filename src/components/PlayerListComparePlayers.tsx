import React, {useState} from 'react';
import usePlayers from '../hooks/usePlayers';
import type {Player} from '../hooks/usePlayers';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Divider } from '@mui/material';
//mui form
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//Router
import { Link } from 'react-router';
import {CircularProgress} from '@mui/material';

export default function ComparePlayers() {
    const [inputNameX, setInputNameX] = useState("");
    const [inputNameY, setInputNameY] = useState("");
    const [queryParamsX, setQueryParamsX] = useState({player: "", offset: 0});
    const [queryParamsY, setQueryParamsY] = useState({player: "", offset: 0});
    const { players: playersX, isLoading: isLoadingX, hasPreviousPage: hasPreviousPageX, hasNextPage: hasNextPageX } = usePlayers(queryParamsX);
    const { players: playersY, isLoading: isLoadingY, hasPreviousPage: hasPreviousPageY, hasNextPage: hasNextPageY } = usePlayers(queryParamsY);
    const [offsetForHookX, setOffsetForHookX] = useState(0);
    const [offsetForHookY, setOffsetForHookY] = useState(0);
    const [selectedPlayerXName, setSelectedPlayerXName] = useState("no player X selected");
    const [selectedPlayerXRk, setSelectedPlayerXRk] = useState<null | number>(null);
    const [selectedPlayerYName, setSelectedPlayerYName] = useState("no player Y selected");
    const [selectedPlayerYRk, setSelectedPlayerYRk] = useState<null | number>(null);


        function handleSubmitX(e: React.FormEvent) {
            e.preventDefault();
            setQueryParamsX({player: inputNameX, offset: 0});
            setOffsetForHookX(0);
        }
        function handleSubmitY(e: React.FormEvent) {
            e.preventDefault();
            setQueryParamsY({player: inputNameY, offset: 0});
            setOffsetForHookY(0);
        }
        

        function handleNextPageX() {
      setOffsetForHookX(offsetForHookX+10);
      setQueryParamsX({player: inputNameX, offset: offsetForHookX+10})
    }

        function handleNextPageY() {
      setOffsetForHookY(offsetForHookY+10);
      setQueryParamsY({player: inputNameY, offset: offsetForHookY+10})
    }
     function handlePreviousPageX() {
        setOffsetForHookX(offsetForHookX-10);
      setQueryParamsX({player: inputNameX, offset: offsetForHookX-10})
      }

      function handlePreviousPageY() {
        setOffsetForHookY(offsetForHookY-10);
      setQueryParamsY({player: inputNameY, offset: offsetForHookY-10})
      }
        
    function handlePlayerXSelected(player : Player) {
        setSelectedPlayerXName(player.Player);
        setSelectedPlayerXRk(player.Rk);
    }
    
    function handlePlayerYSelected(player : Player) {
        setSelectedPlayerYName(player.Player);
        setSelectedPlayerYRk(player.Rk);
    }

    if (isLoadingX || isLoadingY) return <><Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width:"100vw", height: "100vh"}}><CircularProgress size={80}/></Box></>;
                return (<>
                    <Box sx={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
                        <form onSubmit={handleSubmitX}>
                          <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", marginBottom: "10px", padding: "10px"}} spacing={2}>
                            <TextField
                              label="Name of player X"
                              value={inputNameX}
                              onChange={(e) => setInputNameX(e.target.value)}
                            />
                            <Button type="submit" variant="contained">
                              Search
                            </Button>
                          </Stack>
                        </form>

                        <form onSubmit={handleSubmitY}>
                          <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "10px", marginBottom: "10px", padding: "10px"}} spacing={2}>
                            <TextField
                              label="Name of player Y"
                              value={inputNameY}
                              onChange={(e) => setInputNameY(e.target.value)}
                            />
                            <Button type="submit" variant="contained">
                              Search
                            </Button>
                          </Stack>
                        </form>
                    </Box>
<TableContainer sx={{borderRadius: "10px",display: "flex", flexDirection: "row", gap: 10}} component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">squad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {playersX.map((player) => (
          
              <TableRow sx={{cursor: "pointer"}}  key={player.Rk} onClick={() => handlePlayerXSelected(player)}>
                <TableCell component="th" scope="row">
                  {player.Player}
                </TableCell>
                <TableCell align="right">{player.Age}</TableCell>
                <TableCell align="right">{player.Squad}</TableCell>
              </TableRow>

          ))}
           {!isLoadingX && playersX.length === 0 && (
             <TableRow>
                <TableCell colSpan={4} align="center">
                    No players found
                </TableCell>
            </TableRow>
           )}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} sx={{width: "100%"}}>
              <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                <Button sx={{alignSelf: "left"}} disabled={!hasPreviousPageX} onClick={handlePreviousPageX}>previous page</Button>
                <Button sx={{alignSelf: "right"}}  disabled={!hasNextPageX} onClick={handleNextPageX}>next page</Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
        
      </Table>

      <Box sx={{padding: "10px"}}>
          <Typography sx={{marginBottom: "10px"}} variant={"h6"}>{selectedPlayerXName}</Typography>
          <Divider></Divider>
          <Typography variant={"h6"}>{selectedPlayerYName}</Typography>
          {
          selectedPlayerXRk !== null && selectedPlayerYRk !== null &&
          <Button color='warning' component={Link} to={"/playerComparisonPage/"+selectedPlayerXRk+"/"+selectedPlayerYRk}>Compare Players</Button>
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
          
              <TableRow  key={player.Rk} onClick={() => handlePlayerYSelected(player)} sx={{cursor: "pointer"}}>
                <TableCell component="th" scope="row">
                  {player.Player}
                </TableCell>
                <TableCell align="right">{player.Age}</TableCell>
                <TableCell align="right">{player.Squad}</TableCell>
              </TableRow>

          ))}
           {!isLoadingY && playersY.length === 0 && (
             <TableRow>
                <TableCell colSpan={4} align="center">
                    No players found
                </TableCell>
            </TableRow>
           )}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} sx={{width: "100%"}}>
              <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                <Button sx={{alignSelf: "left"}} disabled={!hasPreviousPageY} onClick={handlePreviousPageY}>previous page</Button>
                <Button sx={{alignSelf: "right"}}  disabled={!hasNextPageY} onClick={handleNextPageY}>next page</Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </TableContainer>
  </>)
}