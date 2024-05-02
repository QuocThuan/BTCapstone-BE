import express from 'express'
import { middleToken } from '../config/jwt.js';
import { getImageById, getSaveById, getUser, login, postImage, signUp } from '../controller/userController.js';


const userRouter = express.Router()

userRouter.post('/signUp', signUp)

userRouter.post('/login', login)

userRouter.get("/get-user-by-id", middleToken, getUser)

userRouter.get("/get-image-by-id", middleToken, getImageById)

userRouter.get("/get-save-by-id", middleToken, getSaveById)

userRouter.post("/post-image", middleToken, postImage)

export default userRouter;