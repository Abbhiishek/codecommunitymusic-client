
export interface ILeaderboardData {
    username: string;
    display_name: string;
    profile_pic: string;
    created_at: string;
    karma: number;
}


export interface ILeaderboard {
    leaderboard: ILeaderboardData[];
}