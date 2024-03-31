import express from 'express'
import { getLikeByRes, getLikeByUser, getRateByRes, getRateByUser, postLike, postOrder, postRate } from '../controller/controller.js';

const router = express.Router()

router.get('/get-like-res/:resId', getLikeByRes)

router.get('/get-like-user/:userId', getLikeByUser)

router.post('/post-like', postLike)

router.post('/post-rate', postRate)

router.get('/get-rate-user/:userId', getRateByUser)

router.get('/get-rate-res/:resId', getRateByRes)

router.post('/post-order', postOrder)

export default router;
