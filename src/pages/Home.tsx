import { Link } from "react-router";
import { Button, Paper, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Chip, Divider } from "@mui/material";
//components
import "./styles/Home.css";
import { Typography } from "@mui/material";
import Title from "../components/Title.tsx";
import FeatureGrid from "../components/FeatureGrid.tsx";
import { Box } from "@mui/material";
import Subtitle from "../components/Subtitle.tsx";
import PlayersRadarChart from "../components/PlayersRadarChart.tsx";
import type { playerComplete } from "../types/playerComplete";
import aiAnalysisShowcase from "../images/ai_analysis_showcase_1080.mp4";
import bundesligaLogo from "../images/bundesliga.png";
import laLigaLogo from "../images/laliga.png";
import ligue1Logo from "../images/ligue1.png";
import premierLeagueLogo from "../images/premierleague.png";
import serieALogo from "../images/seriea.png";

const mockPlayer1 = {
    Player: "Erling Haaland",
    Gls: 22,
    Goals: 22,
    "G-PK": 19,
    "Goals-PK": 19,
    Ast: 3,
    Assists: 3,
    xG: 22.0,
    npxG: 18.8,
    xAG: 3.0,
    "G+A": 25,
    Carries: 310,
    PrgP: 20,
    "Progressive p.": 20,
    PrgC: 24,
    "Progressive c.": 24,
    KP: 29,
    "key passes": 29,
} as unknown as playerComplete;

const mockPlayer2 = {
    Player: "Alexander Isak",
    Gls: 23,
    Goals: 23,
    "G-PK": 19,
    "Goals-PK": 19,
    Ast: 6,
    Assists: 6,
    xG: 20.3,
    npxG: 17.2,
    xAG: 4.3,
    "G+A": 29,
    Carries: 615,
    PrgP: 88,
    "Progressive p.": 88,
    PrgC: 83,
    "Progressive c.": 83,
    KP: 41,
    "key passes": 41,
} as unknown as playerComplete;

const mockInsights = [
    {
        label: "Finishing Variance",
        evidence: "26 goals against 20.3 xG over 2381 minutes.",
        interpretation: "The positive delta between goals and xG suggests a period of clinical finishing that may be subject to regression toward expected mean output."
    },
    {
        label: "Buildup-Creation Divergence",
        evidence: "97 progressive passes and 35 key passes against 5.6 xA.",
        interpretation: "High progressive passing volume relative to xA suggests a role that prioritizes advancing the ball through the thirds rather than final-action delivery, though chance quality remains a contributing factor."
    },
    {
        label: "Defensive Inactivity",
        evidence: "13 tackles attempted and 2 interceptions in 2381 minutes.",
        interpretation: "The low defensive action volume confirms a profile that contributes almost exclusively in the offensive third, offering minimal utility in pressing or defensive transition phases."
    }
];

const features = [
    {
        title: "Filter by stats",
        description: "Set minimum thresholds for goals, assists, xG, xA, and more to find matching players.",
        icon: (
            <form onSubmit={(e) => e.preventDefault()}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap", alignItems: 'center', borderRadius: "20px", p: 2 }} spacing={2}>
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Goals" value={1} size="small" sx={{ width: "90px" }} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="Assists" value={2} size="small" sx={{ width: "90px" }} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="matches" value={10} size="small" sx={{ width: "90px" }} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="xG" value={1.1} size="small" sx={{ width: "90px" }} />
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="xA" value={1.1} size="small" sx={{ width: "90px" }} />
                    <FormControl size="small" sx={{ minWidth: 110 }}>
                        <InputLabel id="homePositionLabel">Position</InputLabel>
                        <Select sx={{ borderRadius: "20px" }} labelId="homePositionLabel" value="FW" label="Position">
                            <MenuItem value="ANY">Any</MenuItem>
                            <MenuItem value="FW">Forward</MenuItem>
                            <MenuItem value="MF">Midfielder</MenuItem>
                            <MenuItem value="DF">Defender</MenuItem>
                            <MenuItem value="GK">Goalkeeper</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={{ borderRadius: "20px" }} type="submit" variant="contained" size="small">Search</Button>
                </Stack>
            </form>
        )
    },
    {
        title: "Head-to-head comparison",
        description: "Put two players side by side across every metric, with optional AI breakdown.",
        icon: <PlayersRadarChart players={[mockPlayer1, mockPlayer2]} chartType="offensive" />
    },
    {
        title: "Radar charts",
        description: "Offensive, defensive, and goalkeeping profiles in one visual.",
        icon: <PlayersRadarChart players={[mockPlayer1]} chartType="offensive" />
    },
    {
        title: "AI scouting report",
        description: "Generate a written summary, key insights, and tactical role for any player.",
        icon: (
            <Paper sx={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: "20px", py: 2, maxHeight: "350px", overflowY: "auto" }}>
                {mockInsights.map((insight, index) => (
                    <Box key={index}>
                        <Box sx={{ p: 2 }}><strong><Typography variant="subtitle1">{insight.label}</Typography></strong></Box>
                        <Divider />
                        <Box sx={{ p: 2 }}><Typography variant="body2">{insight.evidence}</Typography></Box>
                        <Box sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">{insight.interpretation}</Typography></Box>
                    </Box>
                ))}
            </Paper>
        )
    },
    {
        title: "Percentile rankings",
        description: "Goals, assists, xG, progressive carries and passes ranked against all players.",
        icon: (
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                <Paper sx={{ flex: "1 1 110px", p: 2, borderRadius: "20px" }}><Typography color="primary.light" variant="body2">Goals/90</Typography><Typography variant="h6">51.6th</Typography></Paper>
                <Paper sx={{ flex: "1 1 110px", p: 2, borderRadius: "20px" }}><Typography color="primary.light" variant="body2">Assists/90</Typography><Typography variant="h6">53.4th</Typography></Paper>
                <Paper sx={{ flex: "1 1 110px", p: 2, borderRadius: "20px" }}><Typography color="primary.light" variant="body2">Progressive Carries/90</Typography><Typography variant="h6">43.6th</Typography></Paper>
                <Paper sx={{ flex: "1 1 110px", p: 2, borderRadius: "20px" }}><Typography color="primary.light" variant="body2">Progressive Passes/90</Typography><Typography variant="h6">96.9th</Typography></Paper>
                <Paper sx={{ flex: "1 1 110px", p: 2, borderRadius: "20px" }}><Typography color="primary.light" variant="body2">expected Goals/90</Typography><Typography variant="h6">21.7th</Typography></Paper>
            </Box>
        )
    },
    {
        title: "Tactical fit",
        description: "Suggested formation role and system based on the player's statistical profile.",
        icon: (
            <Paper sx={{ borderRadius: "20px", p: 4 }} variant="outlined">
                <Typography variant="h6">preferred role:</Typography>
                <Chip color="secondary" variant="outlined" label="High-Volume Scoring Link" sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>preferred system:</Typography>
                <Chip sx={{ height: "auto", mt: 2, "& .MuiChip-label": { whiteSpace: "normal" } }} color="secondary" label="Functions as a deep-dropping striker who balances high-volume penalty area presence with creative distribution in the middle third." />
            </Paper>
        )
    },
]


////////////////////////////////////////



export default function Home() {

    return (
        <>
            <Title>Find, compare, and analyze <strong>footballers</strong></Title>
            <Subtitle>xG, percentiles, radar charts, and player-specific scouting reports, all free and open-source.</Subtitle>

            <Box sx={{ display: "flex", gap: { xs: 0, sm: 4 }, flexDirection: { xs: "column", sm: "row" } }}>
                <Button sx={{ width: "100%", p: 4, mt: 2, borderRadius: "20px", border: "solid 5px" }} variant="outlined" component={Link} to={"/advanced_search"}><Typography sx={{ color: "text.primary", fontWeight: "bold" }}>Advanced Search</Typography></Button> <br />
                <Button sx={{ width: "100%", p: 4, mt: 2, borderRadius: "20px", border: "solid 5px" }} variant="outlined" component={Link} to={"/name_search"}><Typography sx={{ color: "text.primary", fontWeight: "bold" }}>Search by name</Typography></Button> <br />
                <Button sx={{ width: "100%", p: 4, mt: 2, borderRadius: "20px", border: "solid 5px" }} variant="outlined" component={Link} to={"/compare_players"}><Typography sx={{ color: "text.primary", fontWeight: "bold" }}>Compare players</Typography></Button> <br />
            </Box>
            <Typography sx={{ mt: 12, mb: 4 }} variant={"h2"}>Features</Typography>
            <FeatureGrid features={features}></FeatureGrid>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ mt: 12, mb: 4, maxWidth: "800px" }} variant={"h2"} >Get <strong>advanced analysis</strong>, key insights and the system the player is best suited for.</Typography>
                <Paper elevation={0} sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", display: "flex", flexDirection: "row", gap: 2, height: "50px", alignItems: "center", pl: 2 }}>
                    <Box sx={{ width: "15px", height: "15px", borderRadius: "100px", backgroundColor: "#e95b54" }}></Box>
                    <Box sx={{ width: "15px", height: "15px", borderRadius: "100px", backgroundColor: "#f5bc3e" }}></Box>
                    <Box sx={{ width: "15px", height: "15px", borderRadius: "100px", backgroundColor: "#64cc42" }}></Box>
                </Paper>
                <Box component="video" src={aiAnalysisShowcase} autoPlay muted loop sx={{ borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", border: "solid 10px", borderColor: "background.paper", borderTop: "0" }}></Box>
            </Box>

            <Typography sx={{ mt: 12, mb: 4, maxWidth: "800px" }} variant={"h2"}>Featuring players from <strong>all 5 biggest leagues</strong></Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "center", justifyContent: "center", py: 4, flexWrap: "wrap" }}>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"150px"} src={premierLeagueLogo} alt="Premier League" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} src={laLigaLogo} alt="La Liga" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} src={ligue1Logo} alt="Ligue 1" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"150px"} src={serieALogo} alt="Serie A" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} src={bundesligaLogo} alt="Bundesliga" /></Paper>
            </Box>
            <Button variant="outlined" sx={{ width: "100%", mt: 6, p: 4, borderRadius: "20px", border: "solid 5px" }} component={Link} to={"/advanced_search"}>Start scouting NOW</Button >
        </>
    )
};
