export type Insight = {
    label: string,
    evidence: string,
    interpretation: string
}

export type AIApiResponse =
    {
        data: {
            profileTag: string,
            insights: Insight[],
            roleFit: string,
            summary: string,
            apiLimitReached: boolean,
        }
    }


export type AIApiComparisonResponse =
    {
        data: {
            summary: string,
            apiLimitReached: boolean
        }
    }
export type PlayerMinified = {
    Rk: number;
    Player: string;
    Age: number;
    Squad: string;
    pos?: string;
}
