import { useState } from "react";
import { promptBackendAi, promptBackendAiComparison } from "../services/api";
import type { playerCompleteType } from "../types/playerComplete";
export default function useAi(player: playerCompleteType | null) {
    const [nickname, setNickname] = useState<string | null>(null);
    const [rating, setRating] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [apiLimitReached, setApiLimitReached] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    async function generateAiPlayerSummary() {
        setIsLoading(true);
        if(player === null) {
            setError("I haven't recieved a valid player...");
            setIsLoading(false);
            return;
        }
        try {
            const response = await promptBackendAi(player);
             setApiLimitReached(response.data.apiLimitReached);
             setNickname(response.data.nickname);
             setRating(response.data.rating);
             setSummary(response.data.summary);
            if (response.data.apiLimitReached === true) {
             setTimeout(() => {
                setApiLimitReached(false);
                setSummary("you can analyze again!");
             }, 60000);
            } 
        } catch(error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
        
    }

    return {summary, nickname, rating, isLoading, error, apiLimitReached, generateAiPlayerSummary};
}