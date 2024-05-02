import express from 'express'
import { middleToken } from '../config/jwt.js';
import { deleteImage, getImageById, getSaveById, getUser, login, postImage, signUp, updateUser } from '../controller/userController.js';


const userRouter = express.Router()

userRouter.post('/signUp', signUp)

userRouter.post('/login', login)

userRouter.get("/get-user-by-id", middleToken, getUser)

userRouter.get("/get-image-by-id", middleToken, getImageById)

userRouter.get("/get-save-by-id", middleToken, getSaveById)

userRouter.post("/post-image", middleToken, postImage)

userRouter.delete("/delete-image/:id", middleToken, deleteImage)

userRouter.put("/update-user", middleToken, updateUser)



export default userRouter;