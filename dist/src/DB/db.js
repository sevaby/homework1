"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const Resolutions_1 = require("../Enum/Resolutions");
const date = new Date();
let publicationDate = new Date();
publicationDate.setDate(date.getDate() + 1);
exports.db = {
    videos: [
        { id: 1, title: 'video1', author: 'Igor', canBeDownloaded: true, minAgeRestriction: 18, createdAt: date.toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions_1.Resolutions.P360, Resolutions_1.Resolutions.P480] },
        { id: 2, title: 'video2', author: 'Ivan', canBeDownloaded: true, minAgeRestriction: 16, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions_1.Resolutions.P360, Resolutions_1.Resolutions.P480] },
        { id: 3, title: 'video3', author: 'Alex', canBeDownloaded: true, minAgeRestriction: 12, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions_1.Resolutions.P360, Resolutions_1.Resolutions.P480] },
        { id: 4, title: 'video4', author: 'Olga', canBeDownloaded: true, minAgeRestriction: 6, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString(), availableResolutions: [Resolutions_1.Resolutions.P360, Resolutions_1.Resolutions.P480] },
    ]
};
