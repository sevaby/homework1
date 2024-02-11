import {VideoType} from "../Type/VideoType";
import {Resolutions} from "../Enum/Resolutions";

const date: Date = new Date()
let publicationDate: Date = new Date()
publicationDate.setDate(date.getDate() + 1)
export const db: { videos: VideoType[] } = {
    videos: [
        {id: 1, title: 'video1', author: 'Igor', canBeDownloaded: true, minAgeRestriction: 18, createdAt: date.toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions.P360, Resolutions.P480]},
        {id: 2, title: 'video2', author: 'Ivan', canBeDownloaded: true, minAgeRestriction: 16, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions.P360, Resolutions.P480]},
        {id: 3, title: 'video3', author: 'Alex', canBeDownloaded: true, minAgeRestriction: 12, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions.P360, Resolutions.P480]},
        {id: 4, title: 'video4', author: 'Olga', canBeDownloaded: true, minAgeRestriction: 6, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions.P360, Resolutions.P480]},
    ]
}