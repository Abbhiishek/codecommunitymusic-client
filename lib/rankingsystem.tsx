const levelRanges: { min: number; max: number; name: string, color: string }[] = [
    { min: 0, max: 10, name: 'Beginners', color: 'text-green-500' },
    { min: 11, max: 50, name: 'Rogers', color: 'text-red-500' },
    { min: 51, max: 150, name: 'Explorers', color: 'text-green-500' },
    { min: 151, max: 400, name: 'Adventurers', color: 'text-teal-500' },
    { min: 401, max: 900, name: 'Achievers', color: 'text-green-500' },
    { min: 901, max: 6000, name: 'Challengers', color: 'text-green-500' },
    { min: 6001, max: 9000, name: 'Masters', color: 'text-green-500' },
    { min: 9000, max: 18000, name: 'Experts', color: 'text-green-500' },
    { min: 18001, max: 35000, name: 'Legends', color: 'text-green-500' },
    { min: 35001, max: Infinity, name: 'Titans', color: 'text-yellow-500' },
];


export function getLevel(karma: number) {
    return levelRanges.find((range) => karma >= range.min && karma <= range.max);
}


export function getprogress(karma: number) {
    const level = getLevel(karma);
    if (!level) return 0;
    return Math.round(((karma - level.min) / (level.max - level.min)) * 100);
}