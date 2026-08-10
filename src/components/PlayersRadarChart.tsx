import type { playerComplete } from "../types/playerComplete"
import { RadarChart } from "@mui/x-charts"
import { useTheme } from "@mui/material";
import { getGoalkeeperRadarConfig, getOffensiveRadarConfig } from "../utils/radarConfig";

type PlayersRadarChartProps = {
    players: playerComplete[]
    chartType: "offensive" | "defensive" | "goalkeeping";
}

function getPer90(value: number | null, minutes: number): number {
    if (value === null || minutes <= 0) return 0;
    return Number((value * 90 / minutes).toFixed(2));
}

function getPercentage(value: number | null, total: number): number {
    if (value === null || total <= 0) return 0;
    return Number((value * 100 / total).toFixed(1));
}

export default function PlayersRadarChart({ players, chartType }: PlayersRadarChartProps) {

    const theme = useTheme();
    const radarColors = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
    ]

    if (players.length === 0) return null;

    if (players.some((player) => player.Min < 900)) {
        return null;
    }

    if (chartType === "offensive") {

        if (players.some((player) =>
            player.us_npg_per90_percentile_position === null ||
            player.us_npxG_per90_percentile_position === null ||
            player.us_assists_per90_percentile_position === null ||
            player.us_xA_per90_percentile_position === null ||
            player.us_key_passes_per90_percentile_position === null ||
            player.us_xGBuildup_per90_percentile_position === null
        )) {
            return <p>Offensive percentile data is not available for every player.</p>;
        }

        const showNpxGPerShot = players.every((player) => player.us_npxG_per_shot_percentile_position !== null);
        const radarMetrics = getOffensiveRadarConfig(players[0]!, showNpxGPerShot).metrics;

        return (
            <RadarChart sx={{ width: "100%" }} height={420}
                title="Offensive position percentiles"
                desc="Per-90 attacking statistics compared with players in the same position."
                divisions={4}
                colors={radarColors}
                series={players.map((player) => ({
                    label: player.Player,
                    data: getOffensiveRadarConfig(player, showNpxGPerShot).data,
                    fillArea: true
                }))}
                radar={{
                    max: 100,
                    metrics: radarMetrics
                }}
            />
        );
    }

    if (chartType === "defensive") {
        return (
            <RadarChart sx={{ width: "100%" }} height={420}
                title="Defensive activity"
                desc="Defensive actions per 90 and aerial-duel win percentage."
                divisions={4}
                colors={radarColors}
                series={players.map((player) => ({
                    label: player.Player,
                    data: [
                        getPer90(player.TklW, player.Min),
                        getPer90(player.Int, player.Min),
                        getPer90(player.Blocks_stats_defense, player.Min),
                        getPer90(player.Clr, player.Min),
                        getPer90(player.Recov, player.Min),
                        getPercentage(player.Won, Number(player.Won) + Number(player.Lost_stats_misc))
                    ],
                    fillArea: true
                }))}
                radar={{
                    metrics: [
                        { name: "Tackles won/90", min: 0, max: 4 },
                        { name: "Interceptions/90", min: 0, max: 3 },
                        { name: "Blocks/90", min: 0, max: 3 },
                        { name: "Clearances/90", min: 0, max: 10 },
                        { name: "Recoveries/90", min: 0, max: 12 },
                        { name: "Aerial win %", min: 0, max: 100 }
                    ]
                }}
            />
        );
    }

    if (chartType === "goalkeeping") {

        if (players.some((player) =>
            player["Save%"] === null ||
            player["/90"] === null ||
            player["Cmp%_stats_keeper_adv"] === null ||
            player["Launch%"] === null ||
            player["Stp%"] === null ||
            player["#OPA/90"] === null
        )) {
            return <p>Goalkeeping data is not available for every player.</p>;
        }

        const radarMetrics = getGoalkeeperRadarConfig(players[0]!).metrics;

        return (
            <RadarChart sx={{ width: "100%" }} height={420}
                title="Goalkeeper profile"
                desc="Shot stopping, distribution, cross management and sweeping statistics."
                divisions={4}
                colors={radarColors}
                series={players.map((player) => ({
                    label: player.Player,
                    data: getGoalkeeperRadarConfig(player).data,
                    fillArea: true
                }))}
                radar={{
                    metrics: radarMetrics
                }}
            />
        );
    }
}
