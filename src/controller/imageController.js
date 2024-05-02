import { decodeToken } from '../config/jwt.js';
import { responseData } from '../config/response.js';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient

const getImage = async (req, res) => {
    let data = await prisma.hinh_anh.findMany({
        where: {
            da_xoa: 0
        }
    })
    responseData(res, 'Lấy hình ảnh thành công', 200, data)
}

const getImageByName = async (req, res) => {
    let { name } = req.params;
    let data = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh: {
                contains: name
            },
            da_xoa: 0
        }
    })

    responseData(res, 'Thành công', 200, data)
}

const getImageById = async (req, res) => {
    let { id } = req.params;
    let data = await prisma.hinh_anh.findMany({
        where: {
            hinh_id: Number(id),
        },
        include: {
            nguoi_dung: true
        }
    })

    responseData(res, 'Thành công', 200, data)
}

const getCommentById = async (req, res) => {
    let { id } = req.params;
    let data = await prisma.hinh_anh.findMany({
        where: {
            hinh_id: Number(id)
        },
        include: {
            binh_luan: true
        }
    })

    responseData(res, 'Thành công', 200, data)
}

const getSaveById = async (req, res) => {
    let { id } = req.params;
    let data = await prisma.hinh_anh.findMany({
        where: {
            hinh_id: Number(id)
        },
        include: {
            luu_anh: true
        }
    })

    responseData(res, 'Thành công', 200, data)
}

const postComment = async (req, res) => {

    let { hinh_id, content } = req.body;

    let { authorization } = req.headers;
    const token = authorization.slice(7)

    let { nguoi_dung_id } = decodeToken(token)

    let newComment = {
        hinh_id: Number(hinh_id),
        nguoi_dung_id: nguoi_dung_id,
        noi_dung: content,
        ngay_binh_luan: new Date()
    }

    await prisma.binh_luan.create({ data: newComment })

    responseData(res, 'Thành công', 200, '')
}

export { getImage, getImageByName, getImageById, getCommentById, getSaveById, postComment }
