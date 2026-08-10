export const COMPETITIONS = [
    { value: "es La Liga", label: "La Liga" },
    { value: "it Serie A", label: "Serie A" },
    { value: "eng Premier League", label: "Premier League" },
    { value: "fr Ligue 1", label: "Ligue 1" },
    { value: "de Bundesliga", label: "Bundesliga" },
] as const;

export type Competition = (typeof COMPETITIONS)[number]["value"];
export type CompetitionFilter = Competition | "";
