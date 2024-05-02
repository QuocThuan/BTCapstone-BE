import express from 'express'
import { getCommentById, getImage, getImageById, getImageByName, getSaveById, postComment } from '../controller/imageController.js';
import { middleToken } from '../config/jwt.js';


const imageRouter = express.Router()

imageRouter.get('/get-image', middleToken, getImage)

imageRouter.get('/get-image-by-name/:name', middleToken, getImageByName)

imageRouter.get('/get-image-by-id/:id', middleToken, getImageById)

imageRouter.get('/get-comment-by-id/:id', middleToken, getCommentById)

imageRouter.get('/get-save-by-id/:id', middleToken, getSaveById)

imageRouter.post('/post-comment', middleToken, postComment)




export default imageRouter;
