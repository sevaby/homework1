export function createVideoFactory(title: string, author: string, availableResolutions: string[]) {
    const date: Date = new Date()
    let publicationDate: Date = new Date()
    publicationDate.setDate(date.getDate() + 1)

    return  {
        id: + (new Date()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions,

    };
}