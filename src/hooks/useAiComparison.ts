import type { playerCompleteType } from "../types/playerComplete";
import { promptBackendAiComparison } from "../services/api";
import { useState } from "react";
export default function useAiComparison(playerX: playerCompleteType | null, playerY: playerCompleteType | null) {
    const [summary, setSummary] = useState<string | null>(null);
    const [apiLimitReached, setApiLimitReached] = useState<boolean>(false);
    const [nicknameX, setNicknameX] = useState<string | null>(null);
    const [nicknameY, setNicknameY] = useState<string | null>(null);
    const [ratingX, setRatingX] = useState<string | null>(null);
    const [ratingY, setRatingY] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    async function generateAiPlayerComparison() {
        setIsLoading(true);
        if(playerX === null || playerY === null) {
            setError("I haven't recieved a valid player...");
            setIsLoading(false);
            return;
        }
        try {
            const response = await promptBackendAiComparison(playerX, playerY);
            setApiLimitReached(response.data.apiLimitReached);
            setSummary(response.data.summary);
            setNicknameX(response.data.nicknameX);
            setNicknameY(response.data.nicknameY);
            setRatingX(response.data.ratingX);
            setRatingY(response.data.ratingY);
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
    return {summary, nicknameX, nicknameY, ratingX, ratingY, apiLimitReached, isLoading, error, generateAiPlayerComparison};
}