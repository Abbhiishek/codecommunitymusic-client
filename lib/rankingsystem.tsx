const levelRanges: { min: number; max: number; name: string, color: string }[] = [
    { min: 0, max: 10, name: 'Beginners', color: 'text-green-500' },
    { min: 11, max: 50, name: 'Rogers', color: 'text-red-500' },
    { min: 51, max: 100, name: 'Explorers', color: 'text-green-500' },
    { min: 101, max: 200, name: 'Adventurers', color: 'text-teal-500' },
    { min: 201, max: 350, name: 'Achievers', color: 'text-green-500' },
    { min: 351, max: 500, name: 'Challengers', color: 'text-green-500' },
    { min: 501, max: 650, name: 'Masters', color: 'text-green-500' },
    { min: 651, max: 799, name: 'Experts', color: 'text-green-500' },
    { min: 800, max: 1150, name: 'Legends', color: 'text-green-500' },
    { min: 1151, max: 1500, name: 'Heroes', color: 'text-green-500' },
    { min: 1501, max: 2000, name: 'Gods', color: 'text-green-500' },
];


export function getLevel(karma: number) {
    return levelRanges.find((range) => karma >= range.min && karma <= range.max);
}


export function getprogress(karma: number) {
    const level = getLevel(karma);
    if (!level) return 0;
    return Math.round(((karma - level.min) / (level.max - level.min)) * 100);
}