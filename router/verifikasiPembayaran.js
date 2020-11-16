const express = require('express');
const app = express();
const jwtd = require('jwt-decode')
const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const pelanggan = require("../models/index").pembayaran;

// middleware
app.use(express.urlencoded({
    extended: true
}))


// create
app.post("/:id", async (req, res) => {
    let param = {
        id_pembayaran: req.params.id
    }
    let identitas = jwtd(req.headers.authorization.split(' ')[1])
    id_admin = identitas.id_admin
    let data = {
        status: 1,
        id_admin: id_admin
    }

    pelanggan.update(data, {
            where: param
        })
        .then(result => {
            res.json({
                message: "data has been verified"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app