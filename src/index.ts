import express, {json, Request, Response} from 'express';
import {VideosRouter} from "./Router/VideosRouter";
import {db} from "./DB/db";

export const app = express();

const port = 3006;

app.use(json());
export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_ERROR_404: 404,
}

app.use('/videos', VideosRouter)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})