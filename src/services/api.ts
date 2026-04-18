import type {playerCompleteType} from "../types/playerComplete";
type AiResponse = {
    success: boolean,
    data: {
        nickname: string,
        rating: string,
        summary: string,
        apiLimitReached: boolean,
    }
}
export async function promptBackendAi(player : playerCompleteType): Promise<AiResponse> {
    const response = await fetch(import.meta.env.VITE_API_URL + "/ai",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({player: player}),
        }
    )
    if (response.ok !== true && response.status != 429) {
        //this triggers catch block
        throw new Error("Failed to fetch player AI information!");
    }
    
    return(await response.json());
}

export async function promptBackendAiComparison(playerX: playerCompleteType, playerY: playerCompleteType): Promise<AiResponse> {

        const response = await fetch(import.meta.env.VITE_API_URL + "/ai/comparison",
                    {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({playerX: playerX, playerY: playerY}),
                }
            )
                if (response.ok !== true && response.status != 429) {
                //this triggers catch block
                throw new Error("Failed to fetch comparison AI information!");
        }
        return(await response.json());
    
    
}