import { responseData } from '../config/response.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { createToken, createTokenRef, decodeToken } from '../config/jwt.js';

const prisma = new PrismaClient


const signUp = async (req, res) => {
    try {
        let { email, password, fullName, tuoi } = req.body;

        let checkEmail = await prisma.nguoi_dung.findMany({
            where: {
                email,
            }
        })

        // kiểm tra email trùng
        if (checkEmail.length > 0) {
            // thông báo email tồn tại
            responseData(res, 'Email đã tồn tại', 400, '')
            return;
        }

        let newData = {
            ho_ten: fullName,
            email,
            mat_khau: bcrypt.hashSync(password, 7),
            tuoi: Number(tuoi),
        }

        await prisma.nguoi_dung.create({
            data: newData
        });

        responseData(res, 'Đăng ký thành công', 200, '')

    } catch (err) {
        console.log(err)
        responseData(res, 'Lỗi hệ thống', 500, '')
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let checkEmail = await prisma.nguoi_dung.findFirst({
            where: {
                email,
            }
        });

        if (checkEmail) {
            // check password
            if (bcrypt.compareSync(password, checkEmail.mat_khau)) {
                let key = new Date().getTime();

                let token = createToken({ nguoi_dung_id: checkEmail.nguoi_dung_id, key, ho_ten: checkEmail.ho_ten })

                // tạo refresh token
                let tokenRef = createTokenRef({ nguoi_dung_id: checkEmail.nguoi_dung_id, key });
                checkEmail.refresh_token = tokenRef

                await prisma.nguoi_dung.update({
                    where: {
                        nguoi_dung_id: checkEmail.nguoi_dung_id
                    },
                    data: {
                        refresh_token: checkEmail.refresh_token
                    }
                });

                responseData(res, 'Login thành công', 200, token)
                return
            }
            responseData(res, 'Mật khẩu không đúng', 400, '')

            return;
        }
        responseData(res, 'Email không đúng', 400, '')

    } catch (err) {
        console.log(err)
        responseData(res, 'Lỗi hệ thống', 500, '')
    }
}

const getUser = async (req, res) => {

    let { authorization } = req.headers;
    const token = authorization.slice(7)

    let { nguoi_dung_id } = decodeToken(token)

    let data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id,
        }
    })

    responseData(res, 'Lấy thông tin thành công', 200, data)
}

const getImageById = async (req, res) => {

    let { authorization } = req.headers;
    const token = authorization.slice(7)

    let { nguoi_dung_id } = decodeToken(token)

    let data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id,
        },
        include: {
            hinh_anh: true
        }
    })

    responseData(res, 'Lấy thông tin thành công', 200, data)
}

const getSaveById = async (req, res) => {

    let { authorization } = req.headers;
    const token = authorization.slice(7)

    let { nguoi_dung_id } = decodeToken(token)

    let data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id,
        },
        include: {
            luu_anh: true
        }
    })

    responseData(res, 'Lấy thông tin thành công', 200, data)
}

const postImage = async (req, res) => {
    try {
        let { ten_hinh, duong_dan, mo_ta } = req.body;

        let { authorization } = req.headers;
        const token = authorization.slice(7)

        let { nguoi_dung_id } = decodeToken(token)

        let newImage = {
            ten_hinh,
            duong_dan,
            mo_ta,
            nguoi_dung_id,
        }

        await prisma.hinh_anh.create({ data: newImage })

        responseData(res, 'Post ảnh thành công', 200, '')

    } catch (err) {
        console.log(err)
        responseData(res, 'Lỗi hệ thống', 500, '')
    }
}

export { signUp, login, getUser, getImageById, getSaveById, postImage }
