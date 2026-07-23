import React, {useState} from 'react';
//hooks
import usePlayers from '../hooks/usePlayers';
import { Alert, Box } from '@mui/material';
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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
//Router
import { Link } from 'react-router';

export default function PlayerList() {
    const [inputGoals, setInputGoals] = useState(0);
    const [inputAssists, setInputAssists] = useState(0);
    const [inputPosition, setInputPosition] = useState("ANY");
    const [inputMatchesPlayed, setInputMatchesPlayed] = useState(0);
    const [inputAge, setInputAge] = useState(0);
    const [inputProgressiveCarries, setInputProgressiveCarries] = useState(0);
    const [inputProgressivePasses, setInputProgressivePasses] = useState(0);
    const [inputxG, setInputxG] = useState(0);
    const [inputxA, setInputxA] = useState(0);
    const [queryParams, setQueryParams] = useState({gls: 0, ast: 0, offset: 0, position: "ANY", mp: 0, age: 0, prgc: 0, prgp: 0, xG: 0, xA: 0});
    const { players, error, isLoading, hasPreviousPage, hasNextPage } = usePlayers(queryParams);
    const [offsetForHook, setOffsetForHook] = useState(0);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setQueryParams({gls:inputGoals, ast: inputAssists, position: inputPosition, mp: inputMatchesPlayed, age: inputAge, prgc: inputProgressiveCarries, prgp: inputProgressivePasses, xG: inputxG, xA: inputxA, offset: 0});
        setOffsetForHook(0);
    }
    function handleNextPage() {
      setOffsetForHook(offsetForHook+10);
      setQueryParams({gls: inputGoals, ast: inputAssists, position: inputPosition, mp: inputMatchesPlayed, age: inputAge, prgc: inputProgressiveCarries, prgp: inputProgressivePasses, xG: inputxG, xA: inputxA, offset: offsetForHook+10});
    }
    function handlePreviousPage() {
      setOffsetForHook(offsetForHook-10);
      setQueryParams({gls: inputGoals, ast: inputAssists, position: inputPosition, mp: inputMatchesPlayed, age: inputAge, prgc: inputProgressiveCarries, prgp: inputProgressivePasses, xG: inputxG, xA: inputxA, offset: offsetForHook-10})
    }
    if (isLoading) return <>
    <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "20px", mb: 2, p: 2}}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "20px", mb: 2, p: 2}} spacing={2}>
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Goals"
                  value={inputGoals}
                  onChange={(e) => setInputGoals(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Assists"
                  value={inputAssists}
                  onChange={(e) => setInputAssists(Number(e.target.value))}
                />
                <Button sx={{borderRadius: "20px"}} type="submit" variant="contained"> Search</Button>
              </Stack>
          </form>
        </Stack>
    <Box sx={{height: "653.667px", backgroundColor: "#1e1e1e"}}></Box>    
    </>;
    return (
        <>
        <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "20px", mb: 2, p: 2}}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', flexWrap: "wrap", alignItems: 'center', borderRadius: "20px", mb: 2, p: 2}} spacing={2}>
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Goals"
                  value={inputGoals}
                  onChange={(e) => setInputGoals(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Assists"
                  value={inputAssists}
                  onChange={(e) => setInputAssists(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="matches"
                  value={inputMatchesPlayed}
                  onChange={(e) => setInputMatchesPlayed(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Age"
                  value={inputAge}
                  onChange={(e) => setInputAge(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Progressive Carries"
                  value={inputProgressiveCarries}
                  onChange={(e) => setInputProgressiveCarries(Number(e.target.value))}
                />
                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  label="Progressive Passes"
                  value={inputProgressivePasses}
                  onChange={(e) => setInputProgressivePasses(Number(e.target.value))}
                />
                 <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                  inputProps={{ step: 0.1 }}
                  label="xG"
                  type="number"
                  value={inputxG}
                  onChange={(e) => setInputxG(Number(e.target.value))}/>

                <TextField slotProps={{input: {style: {borderRadius: "20px"}}}}
                inputProps={{ step: 0.1 }}
                  label="xA"
                   type="number"
                  value={inputxA}
                  onChange={(e) => setInputxA(Number(e.target.value))}
                />
                <FormControl sx={{minWidth: 140}}>
                  <InputLabel id="positionLabel">Position</InputLabel>

                  <Select sx={{borderRadius: "20px"}} labelId="positionLabel" value={inputPosition} label="Position" onChange={(e) => setInputPosition(e.target.value)}>
                    <MenuItem value="ANY">Any</MenuItem>
                    <MenuItem value="FW">Forward</MenuItem>
                    <MenuItem value="MF">Midfielder</MenuItem>
                    <MenuItem value="DF">Defender</MenuItem>
                    <MenuItem value="GK">Goalkeeper</MenuItem>
                  </Select>
              </FormControl>
                <Button sx={{borderRadius: "20px"}} type="submit" variant="contained"> Search</Button>
              </Stack>
          </form>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Could not load players: {error}
          </Alert>
        )}

        <TableContainer sx={{borderRadius: "20px"}} component={Paper}>
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
