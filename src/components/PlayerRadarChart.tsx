import type { playerCompleteType } from "../types/playerComplete"
import { RadarChart } from "@mui/x-charts"
type PlayerRadarChartProps = {
    player: playerCompleteType,
    chartType: "offensive" | "defensive" | "goalkeeping";
}

export default function PlayerRadarChart({player,chartType}: PlayerRadarChartProps) {
    if (chartType === "offensive") {
        return <RadarChart sx={{minWidth: "300px"}} height={300}
                series={[{ label: player.Player, data: [player.Gls, player["G-PK"], player.Ast, player.xG, player.npxG, player.xAG, player["G+A"], player.Carries,  player.PrgP, player.PrgC], fillArea: true },]}
                radar={{metrics: ['Goals', 'Goals-PK', 'Assists', 'xG','npxG', 'xAG', 'G+A', 'Carries', 'Progressive p.', 'Progressive c.','key passes']}}
                />
    }
    if (chartType === "defensive") {
        return <RadarChart sx={{minWidth: "300px"}} height={300}
                series={[{ label: player.Player, data: [player.TklW, player.Int, player.Clr, player.Recov, player.CrdY, player.CrdR], fillArea: true },]}
                radar={{metrics: ['Tackles Won', 'Interceptions', 'Clearances', 'Recoveries', 'Yellow C.', 'Red C.']}}
                />
    }
    if (chartType === "goalkeeping") {
        return <RadarChart sx={{minWidth: "300px"}} height={300}
                series={[{ label: player.Player, data: [Number(player.GA), Number(player.GA90), Number(player.Saves), Number(player["Save%"]), player.CK, Number(player.PKsv), Number(player["Cmp%"])], fillArea: true },]}
                radar={{metrics: ['Conceded', 'Condeded/90m', 'Saves', 'save%','clean sheets', 'penalties saved', 'pass completion%']}}
                />
    }
}