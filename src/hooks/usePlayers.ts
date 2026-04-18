//this file handles fetching players form API with optional query parameters
import {useState, useEffect} from 'react';

//accepts optional parameters given from PlayerList component
// any combination of these parameters can be passed to usePlayers hook
type usePlayersProps = {
    offset: number;
    age?: number | string;
    mp?: number | string;
    gls?: number | string;
    ast?: number | string;
    prgc?: number | string;
    prgp?: number | string;
    //for name_search_page
    player?: string;
}

export type Player = {
    Rk: number;
    Player: string;
    Age: number;
    Squad: string;
}

//returns a json with players and loading state
export default function usePlayers({age, mp, gls, ast, prgc, prgp, player, offset}: usePlayersProps) {

    //setPlayers only ever accepts an array of <Player> objects
    //([]) is the default value "the initial state" - empty array
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {   
        let query: string = "";
        //no need to sanitize inputs(for now), backend will handle that
        if(age != null) query += "age=" + age + "&";
        if(mp != null) query += "mp=" + mp + "&";
        if(gls != null) query += "gls=" + gls + "&";
        if(ast != null) query += "ast=" + ast + "&";
        if(prgc != null) query += "prgc=" + prgc + "&";
        if(prgp != null) query += "prgp=" + prgp + "&";
        if(player != null) query += "player=" + player + "&";
        query += "offset=" + offset + "&";
        if(query.endsWith("&")) query = query.slice(0, -1);
        

        async function fetchPlayers() {
            try {
                setIsLoading(true);
                const response = await fetch(import.meta.env.VITE_API_URL + "/search?" + query);

                if (!response.ok) {
                    //get the error data from api response
                    const error = await response.json();
                    setError(error);
                    setPlayers([]);
                    return;
                }
                
                const responseData = await response.json();

                //if is NOT an array
                if (!Array.isArray(responseData.data.players)) {
                    setPlayers([]);
                    return;
                }
                //wont be run if one of the above returns
                setPlayers(responseData.data.players);
                setHasNextPage(responseData.data.hasNextPage);
                setHasPreviousPage(responseData.data.hasPreviousPage);
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

        }


        fetchPlayers();
    },[age, mp, gls, ast, prgc, prgp, player, offset]);
    return {players, error, isLoading, hasPreviousPage, hasNextPage};
}


