const express = require('express')
const app = express()
const port = 8000


app.listen(port, () => console.log(`running on port ${port}`))

// memanggil router
let tarif = require('./router/tarif')
let pelanggan = require('./router/pelanggan')
let penggunaan = require('./router/penggunaan')
let tagihan = require('./router/tagihan')
let pembayaran = require('./router/pembayaran')
let admin = require('./router/admin')
let level = require('./router/level')
let login = require('./router/login')
let verifikasiPembayaran = require('./router/verifikasiPembayaran')
let register = require('./router/register')

// menggunakan router
app.use('/tarif', tarif)
app.use('/pelanggan', pelanggan)
app.use('/penggunaan', penggunaan)
app.use('/tagihan', tagihan)
app.use('/pembayaran', pembayaran)
app.use('/admin', admin)
app.use('/level', level)
app.use('/login', login)
app.use('/verifikasiPembayaran', verifikasiPembayaran)
app.use('/register', register)