import type { playerComplete } from "../types/playerComplete";
import type { AIApiComparisonResponse, AIApiResponse } from "../types/types";

async function getApiErrorMessage(response: Response, fallback: string) {
    try {
        const responseData = await response.json();
        return responseData?.error?.message || fallback;
    } catch {
        return fallback;
    }
}

export async function promptBackendAi(player: playerComplete): Promise<AIApiResponse> {
    const response = await fetch(import.meta.env.VITE_API_URL + "/ai",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: player }),
        }
    );

    if (response.status === 429) {
        return {
            data: {
                profileTag: "unknown",
                insights: [],
                roleFit: "unknown",
                summary: await getApiErrorMessage(response, "You have reached your request limit, try again later."),
                apiLimitReached: true,
            }
        };
    }

    if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, "Failed to fetch player AI information!"));
    }

    return await response.json();
}

export async function promptBackendAiComparison(playerX: playerComplete, playerY: playerComplete): Promise<AIApiComparisonResponse> {
    const response = await fetch(import.meta.env.VITE_API_URL + "/ai/comparison",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerX: playerX, playerY: playerY }),
        }
    );

    if (response.status === 429) {
        return {
            data: {
                summary: await getApiErrorMessage(response, "You have reached your request limit, try again later."),
                apiLimitReached: true,
            }
        };
    }

    if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, "Failed to fetch comparison AI information!"));
    }

    return await response.json();
}
