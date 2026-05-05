export type AIApiResponse = 
{
  success: boolean;
  data: {
        nickname: string,
        rating: string,
        summary: string,
        apiLimitReached: boolean,
    }
}

export type AIApiComparisonResponse = 
{
 success: boolean,
    data: {
        nicknameX: string,
        nicknameY: string,
        ratingX: string,
        ratingY: string,
        summary: string,
        apiLimitReached: boolean,
    }
}
export type PlayerMinified = {
    Rk: number;
    Player: string;
    Age: number;
    Squad: string;
}
