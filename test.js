const jwt = require('jsonwebtoken')
const jwtd = require('jwt-decode')

let jwtHeader = {
    algorithm: 'HS256',
    expiresIn: '1h'
}
let result = {
    username: 'raihan',
    pass: 'okokok'
}
let payload = {
    data: result
}
let secretKey = 'kunciRahasia'

let token = jwt.sign(payload, secretKey, jwtHeader)

let decode = jwtd(token)

console.log(decode)