const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
    let headers = req.headers.authorization,
        token = null

    if (headers != null) {
        token = headers.split(' ')[1]
    }
    if (token != null) {
        let jwtHeader = {
                algorithm: 'HS256'
            },
            secretKey = 'kunciRahasia'

        jwt.verify(token, secretKey, jwtHeader, err => {
            if (err) {
                res.json({
                    massage: err.massage
                })
            } else {
                next()
            }
        })
    } else if (token == null) {
        res.json({
            massage: 'unauthorized / tidak dikenali'
        })
    }
}
module.exports = verifyToken