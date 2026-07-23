import { useState, useEffect } from "react";
import type { playerComplete } from "../types/playerComplete";

export default function usePlayer(rk: number | null) {
    const [player, setPlayer] = useState<null | playerComplete>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (rk === null) return;

        const controller = new AbortController();
        async function fetchPlayer() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(import.meta.env.VITE_API_URL + "/players/" + rk, { signal: controller.signal });

                if (!response.ok) {
                    //get the error data from api response
                    const errorData = await response.json();
                    setError(errorData?.error?.message || "Failed to fetch player");
                    setPlayer(null);
                    //exit function if an error is found
                    return;
                }

                const responseData = await response.json();
                //
                setPlayer(responseData.data);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
                setError(error instanceof Error ? error.message : "Failed to fetch player");
            } finally {
                setIsLoading(false);

            }
        }

        fetchPlayer();
        return () => {
            controller.abort();
        }
    }, [rk]);
    if (rk === null) {
        return { player: null, error: null, isLoading: false };
    }

    return { player, error, isLoading };
}


