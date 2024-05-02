import jwt from 'jsonwebtoken'

// tạo token
export const createToken = (data) => {
    return jwt.sign(data, 'BI_MAT', { expiresIn: '7d' })
}

// kiểm tra token
export const checkToken = (token) => jwt.verify(token, 'BI_MAT', error => error)

// tạo mới token
export const createTokenRef = (data) => {
    return jwt.sign(data, 'BI_MAT_REFRESH', { expiresIn: '60d' })
}

export const checkTokenRef = (token) => jwt.verify(token, 'BI_MAT_REFRESH', error => error)


// giải mã token
export const decodeToken = (token) => {
    return jwt.decode(token)
}

// kiểm tra quyền token
export const middleToken = (req, res, next) => {
    console.log(req.headers)
    // let { token } = req.headers;
    let { authorization } = req.headers;
    const token = authorization.slice(7) // remove Bearer
    console.log(token)
    let error = checkToken(token)
    if (error == null) {
        next()
        return
    } else {
        console.log(error)
        if (error.name == 'TokenExpiredError') {
            res.status(401).send('TokenExpiredError')
        } else {
            res.status(401).send('Không có quyền')
        }
    }
}
