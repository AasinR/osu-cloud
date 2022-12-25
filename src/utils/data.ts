export function sortMaps(
    beatmaps: Beatmap[],
    type: 'Title' | 'Artist' | 'Creator',
    reverse = false
): Beatmap[] {
    beatmaps.sort((a: Beatmap, b: Beatmap) => {
        const valueA = a.metadata[type].toLowerCase();
        const valueB = b.metadata[type].toLowerCase();
        if (valueA < valueB) return reverse ? 1 : -1;
        if (valueA > valueB) return reverse ? -1 : 1;
        return 0;
    });
    return beatmaps;
}
