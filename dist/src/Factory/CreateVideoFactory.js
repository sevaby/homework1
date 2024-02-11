"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoFactory = void 0;
function createVideoFactory(title, author, availableResolutions) {
    const date = new Date();
    let publicationDate = new Date();
    publicationDate.setDate(date.getDate() + 1);
    return {
        id: +(new Date()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions,
    };
}
exports.createVideoFactory = createVideoFactory;
