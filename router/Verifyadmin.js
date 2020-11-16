const jwt = require('jsonwebtoken')
const jwtd = require('jwt-decode')

verifyAdmin = (req, res, next) => {
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
                let identitas = jwtd(token)
                console.log(identitas)
                if (identitas.data.login_sebagai == 'admin') {
                    next()
                } else {
                    res.json({
                        massage: 'anda bukan Admin'
                    })
                }
            }
        })
    } else if (token == null) {
        res.json({
            massage: 'unauthorized / tidak dikenali'
        })
    }
}
module.exports = verifyAdmin