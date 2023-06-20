const levelRanges: { min: number; max: number; name: string }[] = [
    { min: 0, max: 10, name: 'Beginners' },
    { min: 11, max: 50, name: 'Rogers' },
    { min: 51, max: 150, name: 'Explorers' },
    { min: 150, max: 400, name: 'Adventurers' },
    { min: 401, max: 900, name: 'Achievers' },
    { min: 901, max: 6000, name: 'Challengers' },
    { min: 6001, max: 9000, name: 'Masters' },
    { min: 9000, max: 18000, name: 'Experts' },
    { min: 18001, max: 35000, name: 'Legends' },
    { min: 35001, max: Infinity, name: 'Titans' },
];


export function getLevel(karma: number) {
    return levelRanges.find((range) => karma >= range.min && karma <= range.max);
}
