import request from "supertest";
import {app, HTTP_STATUSES} from "../src";
import {CodeResponsesEnum} from "../src/Enum/CodeResponsesEnum";
import {VideoType} from "../src/Type/VideoType";
import {CreateVideoModel} from "../src/Models/CreateVideoModel";
import {db} from "../src/DB/db";


describe('/videos', () => {
    let newVideo: VideoType | null = null

    beforeAll(async () => {
        await request(app).delete('/hometask_01/api/testing/all-data');
    })
    it('should return 200 and empty array', async () => {
        await request(app).get('/hometask_01/api/videos')
            .expect(HTTP_STATUSES.OK_200, []);
    });

    it('- POST does not create the video with incorrect data (no title, no author)', async function () {
        await request(app)
            .post('/hometask_01/api/videos')
            .send({ title: '', author: '' })
            .expect(CodeResponsesEnum.Incorrect_values_400, {
                errorsMessages: [
                    { message: 'title is required', field: 'title' },
                    { message: 'author is required', field: 'author' },
                ],
            })

        const res = await request(app).get('/hometask_01/api/videos')
        expect(res.body).toEqual([])
    })

    let createdVideo: any = null;
    it('- POST create the video with correct data ', async function () {
        const data: CreateVideoModel = {
            title: 'new video by test',
            author: 'test',
            availableResolutions: ['P360', 'P480']
        };
        const createResponse = await request(app)
            .post('/hometask_01/api/videos')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201);

        createdVideo = createResponse.body;

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: 'new video by test',
            author: 'test',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ['P360', 'P480']
        })
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(HTTP_STATUSES.OK_200, [createdVideo]);
    })

    it('+ GET product by ID with correct id', async () => {
        await request(app)
            .get('/hometask_01/api/videos/' + db.videos[0].id)
            .expect(200, newVideo)
    })

});