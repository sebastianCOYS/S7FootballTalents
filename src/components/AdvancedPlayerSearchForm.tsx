import type { FormEvent, ReactElement } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { COMPETITIONS, type CompetitionFilter } from "../types/competition";

export type AdvancedPlayerFilters = { player: string; league: CompetitionFilter; gls: number; ast: number; offset: number; position: string; mp: number; age: number; prgc: number; prgp: number; xG: number; xA: number };
type AdvancedPlayerSearchFormProps = { filters: AdvancedPlayerFilters; onFiltersChange: (filters: AdvancedPlayerFilters) => void; onSubmit: (event: FormEvent) => void };

export default function AdvancedPlayerSearchForm({ filters, onFiltersChange, onSubmit }: AdvancedPlayerSearchFormProps): ReactElement {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", mb: 2, p: 2 }}>
            <form onSubmit={onSubmit}>
                <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", gap: 2, borderRadius: "20px", mb: 2, p: 2 }}>
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Player Name" value={filters.player} onChange={(event) => onFiltersChange({ ...filters, player: event.target.value })} />
                    <FormControl sx={{ minWidth: 190 }}>
                        <InputLabel id="competition-label">Competition</InputLabel>
                        <Select
                            sx={{ borderRadius: "20px" }}
                            labelId="competition-label"
                            value={filters.league}
                            label="Competition"
                            onChange={(event) => onFiltersChange({ ...filters, league: event.target.value as CompetitionFilter })}
                        >
                            <MenuItem value="">Any competition</MenuItem>
                            {COMPETITIONS.map((competition) => (
                                <MenuItem key={competition.value} value={competition.value}>{competition.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Goals" value={filters.gls} onChange={(event) => onFiltersChange({ ...filters, gls: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Assists" value={filters.ast} onChange={(event) => onFiltersChange({ ...filters, ast: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="matches" value={filters.mp} onChange={(event) => onFiltersChange({ ...filters, mp: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Age" value={filters.age} onChange={(event) => onFiltersChange({ ...filters, age: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Progressive Carries" value={filters.prgc} onChange={(event) => onFiltersChange({ ...filters, prgc: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Progressive Passes" value={filters.prgp} onChange={(event) => onFiltersChange({ ...filters, prgp: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} inputProps={{ step: 0.1 }} label="xG" type="number" value={filters.xG} onChange={(event) => onFiltersChange({ ...filters, xG: Number(event.target.value) })} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} inputProps={{ step: 0.1 }} label="xA" type="number" value={filters.xA} onChange={(event) => onFiltersChange({ ...filters, xA: Number(event.target.value) })} />
                    <FormControl sx={{ minWidth: 140 }}>
                        <InputLabel id="positionLabel">Position</InputLabel>
                        <Select sx={{ borderRadius: "20px" }} labelId="positionLabel" value={filters.position} label="Position" onChange={(event) => onFiltersChange({ ...filters, position: event.target.value })}>
                            <MenuItem value="ANY">Any</MenuItem>
                            <MenuItem value="FW">Forward</MenuItem>
                            <MenuItem value="MF">Midfielder</MenuItem>
                            <MenuItem value="DF">Defender</MenuItem>
                            <MenuItem value="GK">Goalkeeper</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained">Search</Button>
                </Box>
            </form>
        </Box>
    );
}
