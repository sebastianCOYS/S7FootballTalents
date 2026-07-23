import { useQuery } from "@tanstack/react-query";
import type { playerComplete } from "../types/playerComplete";

async function fetchPlayer(rk: number, signal: AbortSignal): Promise<playerComplete> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/players/${rk}`, { signal });

    if (!response.ok) {
        let message = "Failed to fetch player";

        const errorData = await response.json().catch(() => null);
        if (typeof errorData?.error?.message === "string") {
            message = errorData.error.message;
        }

        throw new Error(message);
    }

    const responseData = await response.json();
    if (!responseData?.data || typeof responseData.data !== "object") {
        throw new Error("Invalid player response");
    }

    return responseData.data as playerComplete;
}

export default function usePlayer(rk: number | null) {
    const validRk = typeof rk === "number" && Number.isInteger(rk) && rk > 0;
    const { data, error, isLoading } = useQuery({
        queryKey: ["player", rk],
        queryFn: ({ signal }) => fetchPlayer(rk as number, signal),
        enabled: validRk,
    });

    return {
        player: data ?? null,
        error: error?.message ?? null,
        isLoading,
    };
}
