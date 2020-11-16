const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

let admin = require('../models/index').admin
let pelanggan = require('../models/index').pelanggan

app.use(express.urlencoded({
    extended: true
}))

app.post('/', async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    let login_sebagai = req.body.login_sebagai
    let result = null
    if (login_sebagai = 'admin') {
        result = await admin.findOne({
            where: param
        })
    } else if (login_sebagai = 'pelanggan') {
        result = await pelanggan.findOne({
            where: param
        })
    }
    if (result.dataValues == null) {
        // username atau password salah
        res.json({
            massage: 'invalid username or password'
        })
    } else if (result.dataValues != null) {
        // berhasil login
        result.dataValues.login_sebagai = login_sebagai
        let jwtHeader = {
            algorithm: 'HS256',
            expiresIn: '1h'
        }
        let payload = {
            data: result
        }
        let secretKey = 'kunciRahasia'

        let token = jwt.sign(payload, secretKey, jwtHeader)

        res.json({
            data: result,
            token: token
        })
    }
})

module.exports = app