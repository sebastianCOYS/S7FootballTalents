import { useState, useEffect } from "react";
import type {playerCompleteType} from "../types/playerComplete";

//gives you an object containing error, loading state and player object.
export default function usePlayer(rk: number | null) {
    const [player, setPlayer] = useState<null | playerCompleteType>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
            async function fetchPlayer() {
                try {
                    const response = await fetch( import.meta.env.VITE_API_URL+"/players/rk/" + rk);

                    if (!response.ok) {
                        //get the error data from api response
                        const errorData = await response.json();
                        setError(errorData);
                        setPlayer(null);
                        //exit function if an error is found
                        return;
                    }
                    
                    const responseData = await response.json();
                    //
                    setPlayer(responseData.data.player);
                } catch(error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                    
            }
        }

    fetchPlayer();
    }, [rk]);
 return {player, error, isLoading};
}


