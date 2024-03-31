import express from 'express'

const app = express()
app.use(express.json())


import cors from 'cors'
app.use(cors())

app.listen(3003)


import rootRouter from './routes/rootRouter.js'
app.use(rootRouter)
