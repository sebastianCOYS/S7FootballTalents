import type { playerCompleteType } from "../types/playerComplete"
import { RadarChart } from "@mui/x-charts"
type PlayersRadarChartProps = {
    playerX: playerCompleteType,
    playerY: playerCompleteType,
    chartType: "offensive" | "defensive" | "goalkeeping";
}

export default function PlayersRadarChart({playerX, playerY,chartType}: PlayersRadarChartProps) {
    if (chartType === "offensive") {
        return <RadarChart height={300}
                        series={[
                            { label: playerX.Player, data: [playerX.Gls, playerX["G-PK"], playerX.Ast, playerX.xG, playerX.npxG, playerX.xAG, playerX["G+A"], playerX.Carries,  playerX.PrgP, playerX.PrgC], fillArea:true },
                            {label: playerY.Player, data: [playerY.Gls, playerY["G-PK"], playerY.Ast, playerY.xG, playerY.npxG, playerY.xAG, playerY["G+A"], playerY.Carries,  playerY.PrgP, playerY.PrgC], fillArea:true },
                        ]}
                        radar={{metrics: ['Goals', 'Goals-PK', 'Assists', 'xG','npxG', 'xAG', 'G+A', 'Carries', 'Progressive p.', 'Progressive c.','key passes']}}
                        
                        />
    }
    if (chartType === "defensive") {
        return <RadarChart height={300}
                series={[
                    { label: playerX.Player, data: [playerX.TklW, playerX.Int, playerX.Clr, playerX.Recov, playerX.CrdY, playerX.CrdR], fillArea:true },
                    {label: playerY.Player, data: [playerY.TklW, playerY.Int, playerY.Clr, playerY.Recov, playerY.CrdY, playerY.CrdR], fillArea:true },
                ]}
                radar={{metrics: ['Tackles Won', 'Interceptions', 'Clearances', 'Recoveries', 'Yellow C.', 'Red C.']}}
                
                /> 
    }
    if (chartType === "goalkeeping") {
        return <RadarChart height={300}
                series={[{ label: playerX.Player, data: [Number(playerX.GA), Number(playerX.GA90), Number(playerX.Saves), Number(playerX["Save%"]), playerX.CK, Number(playerX.PKsv), Number(playerX["Cmp%"])], fillArea: true },
                 { label: playerY.Player, data: [Number(playerY.GA), Number(playerY.GA90), Number(playerY.Saves), Number(playerY["Save%"]), playerY.CK, Number(playerY.PKsv), Number(playerY["Cmp%"])], fillArea: true }   ]}
                radar={{metrics: ['Conceded', 'Condeded/90m', 'Saves', 'save%','clean sheets', 'penalties saved', 'pass completion%']}}
                />
    }
}