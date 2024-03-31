import initModels from './../models/init-models.js'
import sequelize from './../models/connect.js'
import { responseData } from '../config/response.js';
import like_res from '../models/like_res.js';
import { INTEGER } from 'sequelize';

const model = initModels(sequelize)

const getLikeByRes = async (req, res) => {

    let { resId } = req.params;

    const likes = await model.like_res.findAll({
        where: {
            res_id: resId
        },
        attributes: ['user_id'],
    });

    const userIds = likes.map(like => like.dataValues.user_id);

    const arrUsers = await model.user_res.findAll({
        where: {
            user_id: userIds
        },
        attributes: ['full_name'],
    });

    const users = arrUsers.map(arrUser => arrUser.dataValues.full_name);

    responseData(res, 'Thành công', 200, users)
}

const getLikeByUser = async (req, res) => {

    let { userId } = req.params;

    const users = await model.like_res.findAll({
        where: {
            user_id: userId
        },
        attributes: ['res_id'],
    });

    const resIds = users.map(user => user.dataValues.res_id);

    const arrRes = await model.restaurant.findAll({
        where: {
            res_id: resIds
        },
        attributes: ['res_name'],
    });

    const restaurant = arrRes.map(arrRes => arrRes.dataValues.res_name);

    responseData(res, 'Thành công', 200, restaurant)
}

const postLike = async (req, res) => {

    let { resId, userId } = req.body;

    const existingLike = await model.like_res.findOne({
        where: {
            res_id: resId,
            user_id: userId
        }
    });

    if (existingLike) {
        await model.like_res.destroy({ where: { res_id: resId, user_id: userId } });
        responseData(res, 'Unlike Thành công', 200, '');
    } else {
        await model.like_res.create({
            res_id: resId,
            user_id: userId,
            date_like: new Date()
        });
        responseData(res, 'Like Thành công', 200, '');
    }
};

const postRate = async (req, res) => {

    let { resId, userId, amount } = req.body;

    await model.rate_res.create({
        res_id: resId,
        user_id: userId,
        amount: amount,
        date_rate: new Date()
    });
    responseData(res, 'Đánh giá Thành công', 200, '');
};

const getRateByUser = async (req, res) => {

    let { userId } = req.params;

    const users = await model.rate_res.findAll({
        where: {
            user_id: userId
        },
        attributes: ['res_id'],
    });

    const resIds = users.map(user => user.dataValues.res_id);

    const arrRes = await model.restaurant.findAll({
        where: {
            res_id: resIds
        },
        attributes: ['res_name'],
    });

    const restaurant = arrRes.map(arrRes => arrRes.dataValues.res_name);

    responseData(res, 'Thành công', 200, restaurant)
}

const getRateByRes = async (req, res) => {

    let { resId } = req.params;

    const likes = await model.rate_res.findAll({
        where: {
            res_id: resId
        },
        attributes: ['user_id'],
    });

    const userIds = likes.map(like => like.dataValues.user_id);

    const arrUsers = await model.user_res.findAll({
        where: {
            user_id: userIds
        },
        attributes: ['full_name'],
    });

    const users = arrUsers.map(arrUser => arrUser.dataValues.full_name);

    responseData(res, 'Thành công', 200, users)
}

const postOrder = async (req, res) => {

    let { foodId, userId, amount, code } = req.body;

    await model.order_res.create({
        food_id: foodId,
        user_id: userId,
        amount: amount,
        code: code,
    });
    responseData(res, 'Order Thành công', 200, '');
};

export { getLikeByRes, getLikeByUser, postLike, postRate, getRateByUser, getRateByRes, postOrder }