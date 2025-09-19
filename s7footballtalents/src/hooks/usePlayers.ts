//this file handles fetching players form API with optional query parameters
import {useState, useEffect} from 'react';

//accepts optional parameters given from PlayerList component
// any combination of these parameters can be passed to usePlayers hook
type usePlayersProps = {
    age?: number | string;
    mp?: number | string;
    gls?: number | string;
    ast?: number | string;
    prgc?: number | string;
    prgp?: number | string;
}

export type Player = {
    Rk: number;
    Player: string;
    Age: number;
    Squad: string;
}
//returns a json with players and loading state
export default function usePlayers({age, mp, gls, ast, prgc, prgp}: usePlayersProps) {

    //setPlayers only ever accepts an array of <Player> objects
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let query: string = "";
        //no need to sanitize inputs(for now), backend will handle that
        if(age) query += "age=" + age + "&";
        if(mp) query += "mp=" + mp + "&";
        if(gls) query += "gls=" + gls + "&";
        if(ast) query += "ast=" + ast + "&";
        if(prgc) query += "prgc=" + prgc + "&";
        if(prgp) query += "prgp=" + prgp + "&";

        if(query.endsWith("&")) query = query.slice(0, -1);
        
        //no fetch if query is empty
        if (!query) return;

        setIsLoading(true);
        fetch('http://localhost:3000/search?'+query).then(async res => {
            if (!res.ok) {
                return res.json();
            }
            return res.json();
        })
            .then(data => {
            setPlayers(Array.isArray(data) ? data : []);
        }).catch((err) => {
            console.error(err);
            setPlayers([]);
        }).finally(() => setIsLoading(false));
    },[age, mp, gls, ast, prgc, prgp]);
    return {players, isLoading};
}


