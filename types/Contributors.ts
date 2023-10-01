export type IContributor = {
    name: string;
    role: string;
    contributions: IContributionsList[]
    githubUsername: string;
    rewviewWords: string;

}

export type IContributionsList = {
    title: string;
    description: string;
    issueNumber: number;
    prNumber: number;
    ScopeofChange: "UI/UX" | "Performance" | "Documentation" | "Ehancement" | "Feature"

}