import type { CompetitionFilter } from "../types/competition";

export type PlayerSearchFilters = {
    offset: number;
    league?: CompetitionFilter;
    position?: string;
    player?: string;
    [key: string]: string | number | null | undefined;
};

export function buildPlayersQuery(filters: PlayerSearchFilters): string {
    const parameters = new URLSearchParams();
    const minimumFilters = ["age", "mp", "gls", "ast", "prgc", "prgp", "xA", "xG"];

    for (const [key, value] of Object.entries(filters)) {
        if (value === null || value === undefined || value === "") continue;

        if (key === "position") {
            if (value !== "ANY") {
                parameters.set("pos", String(value));
            }
        } else if (key === "offset") {
            parameters.set("offset", String(value));
        } else if (minimumFilters.includes(key)) {
            const apiKey = key === "xG" ? "xg" : key === "xA" ? "xa" : key;
            parameters.set(apiKey + "_gte", String(value));
        } else {
            parameters.set(key, String(value));
        }
    }

    return parameters.toString();
}
