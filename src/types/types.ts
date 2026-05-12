type insight = {
    label: string,
    evidence: string,
    interpretation: string
}

export type AIApiResponse = 
{
  success: boolean,
        data: {
          profileTag: string,
          insights: insight[],
          roleFit: string,
          summary: string,
          apiLimitReached: boolean,
        }
}


export type AIApiComparisonResponse = 
{
 success: boolean,
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
}
