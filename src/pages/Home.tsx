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
import { COMPETITIONS } from "../types/competition";
import aiAnalysisShowcase from "../images/ai_analysis_showcase_1080.webm";
import bundesligaLogo from "../images/bundesliga.webp";
import laLigaLogo from "../images/laliga.webp";
import ligue1Logo from "../images/ligue1.webp";
import premierLeagueLogo from "../images/premierleague.webp";
import serieALogo from "../images/seriea.webp";

const mockPlayer1 = {
    Player: "Erling Haaland",
    Min: 2736,
    us_npg_per90_percentile_position: 95.3,
    us_npxG_per90_percentile_position: 95.3,
    us_npxG_per_shot_percentile_position: 84.4,
    us_assists_per90_percentile_position: 27.5,
    us_xA_per90_percentile_position: 30.8,
    us_key_passes_per90_percentile_position: 31.8,
    us_xGBuildup_per90_percentile_position: 23.7,
} as unknown as playerComplete;


const mockPlayer2 = {
    Player: "Alexander Isak",
    Min: 2756,
    us_npg_per90_percentile_position: 94.3,
    us_npxG_per90_percentile_position: 91.9,
    us_npxG_per_shot_percentile_position: 87.2,
    us_assists_per90_percentile_position: 68.2,
    us_xA_per90_percentile_position: 58.3,
    us_key_passes_per90_percentile_position: 60.7,
    us_xGBuildup_per90_percentile_position: 22.5,
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

const mockPercentileColumns = ["overall", "league", "team", "position", "nation"];

const mockPercentileRows = [
    { label: "non-penalty goals/90", values: [98, 99, 91, 95, 100] },
    { label: "non-penalty xG/90", values: [96, 97, 88, 95, 99] },
    { label: "assists/90", values: [42, 47, 36, 28, 53] },
    { label: "xA/90", values: [46, 51, 33, 31, 57] },
];

function getPercentileColor(percentile: number): string {
    if (percentile >= 95) return "rgba(28, 203, 203, 0.55)";
    if (percentile >= 85) return "rgba(28, 203, 203, 0.42)";
    if (percentile >= 70) return "rgba(28, 203, 203, 0.30)";
    if (percentile >= 50) return "rgba(28, 203, 203, 0.20)";
    if (percentile >= 30) return "rgba(28, 203, 203, 0.12)";

    return "rgba(28, 203, 203, 0.06)";
}

function getNumberWithOrdinal(number: number): string {
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${number}th`;
    if (number % 10 === 1) return `${number}st`;
    if (number % 10 === 2) return `${number}nd`;
    if (number % 10 === 3) return `${number}rd`;

    return `${number}th`;
}

const features = [
    {
        title: "Filter by stats",
        description: "Set minimum thresholds for goals, assists, xG, xA, and more to find matching players.",
        icon: (
            <form onSubmit={(e) => e.preventDefault()}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap", alignItems: 'center', borderRadius: "20px", p: 2 }} spacing={2}>
                    <TextField slotProps={{ input: { style: { borderRadius: "20px" } } }} label="name" value={"Grealish"} size="small" sx={{ width: "90px" }} />
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
                    <FormControl size="small" sx={{ minWidth: 170 }}>
                        <InputLabel id="home-competition-label">Competition</InputLabel>
                        <Select sx={{ borderRadius: "20px" }} labelId="home-competition-label" value="eng Premier League" label="Competition">
                            {COMPETITIONS.map((competition) => (
                                <MenuItem key={competition.value} value={competition.value}>{competition.label}</MenuItem>
                            ))}
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
        description: "See how a player ranks overall and against league, team, position, and nation peers.",
        icon: (
            <Paper sx={{ width: "100%", borderRadius: "20px", overflowX: "auto" }}>
                <table aria-label="Example player percentile rankings" style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "12px", textAlign: "left" }}>2024/2025</th>
                            {mockPercentileColumns.map((column) => (
                                <th key={column} style={{ padding: "12px 8px", textAlign: "center" }}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockPercentileRows.map((row) => (
                            <tr key={row.label}>
                                <th style={{ padding: "12px", textAlign: "left", whiteSpace: "nowrap" }}>{row.label}</th>
                                {row.values.map((value, index) => (
                                    <td
                                        key={mockPercentileColumns[index]}
                                        style={{
                                            padding: "12px 8px",
                                            textAlign: "center",
                                            backgroundColor: getPercentileColor(value),
                                        }}
                                    >
                                        {getNumberWithOrdinal(value)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
        )
    },
    {
        title: "Tactical fit",
        description: "Suggested formation role and system based on the player's statistical profile.",
        icon: (
            <Paper sx={{ borderRadius: "20px", p: 4 }} variant="outlined">
                <Typography variant="h6">preferred role:</Typography>
                <Chip color="secondary" variant="outlined" label="High-Volume Scoring Link" sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>tactical fit:</Typography>
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
                <Box component="video" src={aiAnalysisShowcase} autoPlay muted loop sx={{ borderBottomLeftRadius: "20px", width: "100%", height: "auto", borderBottomRightRadius: "20px", border: "solid 10px", borderColor: "background.paper", borderTop: "0" }}></Box>
            </Box>

            <Typography sx={{ mt: 12, mb: 4, maxWidth: "800px" }} variant={"h2"}>Featuring players from <strong>all 5 biggest leagues</strong></Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "center", justifyContent: "center", py: 4, flexWrap: "wrap" }}>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"150px"} loading="lazy" src={premierLeagueLogo} alt="Premier League" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} loading="lazy" src={laLigaLogo} alt="La Liga" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} loading="lazy" src={ligue1Logo} alt="Ligue 1" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"150px"} loading="lazy" src={serieALogo} alt="Serie A" /></Paper>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", width: { xs: "100%", sm: "30%" }, height: "200px" }}><img width={"100px"} loading="lazy" src={bundesligaLogo} alt="Bundesliga" /></Paper>
            </Box>
            <Button variant="outlined" sx={{ width: "100%", mt: 6, p: 4, borderRadius: "20px", border: "solid 5px" }} component={Link} to={"/advanced_search"}>Start scouting NOW</Button >
        </>
    )
};
