import type { FormEvent, ReactElement } from "react";
import { Box, Button, TextField } from "@mui/material";

type PlayerNameSearchFormProps = { label: string; playerName: string; onPlayerNameChange: (playerName: string) => void; onSubmit: (event: FormEvent) => void; shouldUseCompactButton?: boolean };

export default function PlayerNameSearchForm({ label, playerName, onPlayerNameChange, onSubmit, shouldUseCompactButton = false }: PlayerNameSearchFormProps): ReactElement {
    return (
        <form onSubmit={onSubmit}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, borderRadius: "10px", mb: 2, p: 2 }}>
                <TextField label={label} slotProps={{ input: { style: { borderRadius: "20px" } } }} value={playerName} onChange={(event) => onPlayerNameChange(event.target.value)} />
                <Button sx={shouldUseCompactButton ? { borderRadius: "20px", fontSize: { xs: "0.75rem", sm: "1.25rem" } } : { borderRadius: "20px" }} type="submit" variant="contained">Search</Button>
            </Box>
        </form>
    );
}
