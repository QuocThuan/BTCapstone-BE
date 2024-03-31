import express from 'express'
import router from './router.js'

const rootRouter = express.Router()

rootRouter.use("/btap", router)


export default rootRouter
