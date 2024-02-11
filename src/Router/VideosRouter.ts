import {Request, Response, Router} from "express";
import {VideoViewModel} from "../Models/VideoViewModel";
import {RequestWithBody, RequestWithParams} from "../../types";
import {URIParamsVideoIdModel} from "../Models/URIParamsVideoIdModel";
import {CreateVideoModel} from "../Models/CreateVideoModel";
import {
    clearErrorsMessages,
    isCorrectAge,
    isCorrectDate,
    validateEnum,
    validateSimple
} from "../Validation/BodyValidation";
import {Resolutions} from "../Enum/Resolutions";
import {createVideoFactory} from "../Factory/CreateVideoFactory";
import {HTTP_STATUSES} from "../index";
import {VideoType} from "../Type/VideoType";
import {db} from "../DB/db";

const getVideoViewModel = (video: VideoType): VideoViewModel => ({
    createdAt: video.createdAt,
    minAgeRestriction: video.minAgeRestriction,
    author: video.author,
    availableResolutions: video.availableResolutions,
    id: video.id,
    title: video.title,
    publicationDate: video.publicationDate,
    canBeDownloaded: video.canBeDownloaded
} )
export const VideosRouter = Router ()
VideosRouter.get('/', (req: Request, res: Response<VideoViewModel[]>) => {

        let foundVideos: VideoType[]  = db.videos;
        res.json(foundVideos.map(getVideoViewModel))
    })

VideosRouter.get('/:id', (req: RequestWithParams<URIParamsVideoIdModel>,
                                            res: Response<VideoViewModel>) => {

        const findVideo = db.videos.find(v => v.id === +req.params.id)
        if (!findVideo) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERROR_404)
            return
        }
        res.json(findVideo)
    })

VideosRouter.post('/', (req: RequestWithBody<CreateVideoModel>, res: Response) => {
    if (req.body.title === null) {
        const nullTitleError = {
            errorsMessages: [{
                message: 'Title cannot be null',
                field: 'title'
            }]
        };

        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(nullTitleError);
        return;
    }
    if (req.body.author === null) {
        const nullTitleError = {
            errorsMessages: [{
                message: 'Author cannot be null',
                field: 'author'
            }]
        };

        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(nullTitleError);
        return;
    }
        const { title, author, availableResolutions} = req.body;


        clearErrorsMessages()

        let errors = validateSimple(title.trim(), 'title', 40)
        validateSimple(author.trim(), 'author', 20)
        validateEnum(availableResolutions, 'availableResolutions', Object.values(Resolutions))


        if (errors.errorsMessages.length) {
            res
                .status(HTTP_STATUSES.BAD_REQUEST_400)
                .json(errors)
            return
        }

        let createdVideo = createVideoFactory(title, author, availableResolutions)

        db.videos.push(createdVideo)
        res
            .status(HTTP_STATUSES.CREATED_201)
            .json(createdVideo)

    })

VideosRouter.put('/:id', (req: Request, res: Response) => {
    if (req.body.title === null) {
        const nullTitleError = {
            errorsMessages: [{
                message: 'Title cannot be null',
                field: 'title'
            }]
        };

        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(nullTitleError);
        return;
    }
    if (req.body.author === null) {
        const nullTitleError = {
            errorsMessages: [{
                message: 'Author cannot be null',
                field: 'author'
            }]
        };

        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(nullTitleError);
        return;
    }
        const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;

        clearErrorsMessages()
        let errors = validateSimple(title.trim(), 'title', 40)
        validateSimple(author.trim(), 'author', 20)
        validateEnum(availableResolutions, 'availableResolutions', Object.values(Resolutions))

        if (minAgeRestriction) {
            isCorrectAge(minAgeRestriction, 'minAgeRestriction', 0, 18)
        }
        isCorrectDate(publicationDate)

        if (errors.errorsMessages.length) {
            res
                .status(HTTP_STATUSES.BAD_REQUEST_400)
                .json(errors)
            return
        }

        const foundVideo = db.videos.find(c => c.id.toString() === req.params.id);

        if (!foundVideo) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERROR_404);
            return;
        }

        foundVideo.title = title;
        foundVideo.author = author;
        foundVideo.availableResolutions = availableResolutions;
        foundVideo.canBeDownloaded = canBeDownloaded ?? false;
        foundVideo.minAgeRestriction = minAgeRestriction;
        foundVideo.publicationDate = publicationDate;

        res.status(HTTP_STATUSES.NO_CONTENT_204).send();
    })

VideosRouter.delete('/:id', (req: Request, res: Response) => {
        const foundVideo = db.videos.find(v => v.id === +req.params.id)
        if (!foundVideo) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERROR_404)
            return
        }
        db.videos = db.videos.filter(v => v.id !== +req.params.id)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
