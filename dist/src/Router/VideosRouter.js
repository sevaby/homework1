"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRouter = void 0;
const express_1 = require("express");
const BodyValidation_1 = require("../Validation/BodyValidation");
const Resolutions_1 = require("../Enum/Resolutions");
const CreateVideoFactory_1 = require("../Factory/CreateVideoFactory");
const index_1 = require("../index");
const db_1 = require("../DB/db");
const getVideoViewModel = (video) => ({
    createdAt: video.createdAt,
    minAgeRestriction: video.minAgeRestriction,
    author: video.author,
    availableResolutions: video.availableResolutions,
    id: video.id,
    title: video.title,
    publicationDate: video.publicationDate,
    canBeDownloaded: video.canBeDownloaded
});
exports.VideosRouter = (0, express_1.Router)();
exports.VideosRouter.get('/', (req, res) => {
    let foundVideos = db_1.db.videos;
    res.json(foundVideos.map(getVideoViewModel));
});
exports.VideosRouter.get('/:id', (req, res) => {
    const findVideo = db_1.db.videos.find(v => v.id === +req.params.id);
    if (!findVideo) {
        res.sendStatus(index_1.HTTP_STATUSES.NOT_FOUND_ERROR_404);
        return;
    }
    res.json(findVideo);
});
exports.VideosRouter.post('/', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    (0, BodyValidation_1.clearErrorsMessages)();
    let errors = (0, BodyValidation_1.validateSimple)(title.trim(), 'title', 40);
    (0, BodyValidation_1.validateSimple)(author.trim(), 'author', 20);
    (0, BodyValidation_1.validateEnum)(availableResolutions, 'availableResolutions', Object.values(Resolutions_1.Resolutions));
    if (errors.errorsMessages.length) {
        res
            .status(index_1.HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors);
        return;
    }
    let createdVideo = (0, CreateVideoFactory_1.createVideoFactory)(title, author, availableResolutions);
    db_1.db.videos.push(createdVideo);
    res
        .status(index_1.HTTP_STATUSES.CREATED_201)
        .json(createdVideo);
});
exports.VideosRouter.put('/:id', (req, res) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    (0, BodyValidation_1.clearErrorsMessages)();
    let errors = (0, BodyValidation_1.validateSimple)(title.trim(), 'title', 40);
    (0, BodyValidation_1.validateSimple)(author.trim(), 'author', 20);
    (0, BodyValidation_1.validateEnum)(availableResolutions, 'availableResolutions', Object.values(Resolutions_1.Resolutions));
    if (minAgeRestriction) {
        (0, BodyValidation_1.isCorrectAge)(minAgeRestriction, 'minAgeRestriction', 0, 18);
    }
    (0, BodyValidation_1.isCorrectDate)(publicationDate);
    if (errors.errorsMessages.length) {
        res
            .status(index_1.HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors);
        return;
    }
    const foundVideo = db_1.db.videos.find(c => c.id.toString() === req.params.id);
    if (!foundVideo) {
        res.sendStatus(index_1.HTTP_STATUSES.NOT_FOUND_ERROR_404);
        return;
    }
    foundVideo.title = title;
    foundVideo.author = author;
    foundVideo.availableResolutions = availableResolutions;
    foundVideo.canBeDownloaded = canBeDownloaded !== null && canBeDownloaded !== void 0 ? canBeDownloaded : false;
    foundVideo.minAgeRestriction = minAgeRestriction;
    foundVideo.publicationDate = publicationDate.toISOString();
    res.status(index_1.HTTP_STATUSES.NO_CONTENT_204).send();
});
exports.VideosRouter.delete('/:id', (req, res) => {
    const foundVideo = db_1.db.videos.find(v => v.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(index_1.HTTP_STATUSES.NOT_FOUND_ERROR_404);
        return;
    }
    db_1.db.videos = db_1.db.videos.filter(v => v.id !== +req.params.id);
    res.sendStatus(index_1.HTTP_STATUSES.NO_CONTENT_204);
});
