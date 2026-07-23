//this file handles fetching players from API with optional query parameters
import { useQuery } from "@tanstack/react-query";
import type { PlayerMinified } from "../types/types";
import { buildPlayersQuery } from "../utils/buildPlayersQuery";

//accepts optional parameters given from PlayerList component
type usePlayersProps = {
    offset: number;
    age?: number | string;
    mp?: number | string;
    gls?: number | string;
    ast?: number | string;
    prgc?: number | string;
    prgp?: number | string;
    xA?: number | string;
    xG?: number | string;
    position?: string;
    //for name_search_page
    player?: string;
};

type PlayersResponse = {
    players: PlayerMinified[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

async function fetchPlayers(params: usePlayersProps): Promise<PlayersResponse> {
    const query = buildPlayersQuery(params);
    const response = await fetch(import.meta.env.VITE_API_URL + "/players?" + query);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error?.message || "Failed to fetch players");
    }

    const responseData = await response.json();

    //if is NOT an array
    if (!Array.isArray(responseData.data)) {
        return { players: [], hasNextPage: false, hasPreviousPage: false };
    }

    return {
        players: responseData.data,
        hasNextPage: responseData.pagination.hasNextPage,
        hasPreviousPage: responseData.pagination.hasPreviousPage,
    };
}

//returns a json with players and loading state
export default function usePlayers(params: usePlayersProps) {
    const { age, mp, gls, ast, prgc, prgp, xA, xG, player, position, offset } = params;
    const { data, error, isLoading } = useQuery({
        queryKey: ["players", { age, mp, gls, ast, prgc, prgp, xA, xG, player, position, offset }],
        queryFn: () => fetchPlayers(params),
    });

    return {
        players: data?.players ?? [],
        error: error ? (error as Error).message : null,
        isLoading,
        hasPreviousPage: data?.hasPreviousPage ?? false,
        hasNextPage: data?.hasNextPage ?? false,
    };
}
