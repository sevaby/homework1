export type VideoViewModel = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean | null,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[],
}