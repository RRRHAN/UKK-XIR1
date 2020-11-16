const express = require('express'),
    app = express(),
    verifyToken = require('./Verifytoken')

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./bukti")
    },
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
// ---------------------------------

const pembayaran = require("../models/index").pembayaran;

// middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(verifyToken)


// read
app.get("/", async (req, res) => {
    pembayaran.findAll()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({
                massage: error.massage
            });
        });
});
//read one
app.get('/:id', async (req, res) => {
    let param = {
        id_pembayaran: req.params.id
    }
    pembayaran.findOne({
        where: param
    }).then(result => {
        res.json(result)
    }).catch(error => {
        res.json({
            massage: error.massage
        })
    })
})
// create
app.post("/", upload.single('bukti'), async (req, res) => {
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: Date.now(),
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: 3000,
        total_bayar: req.body.total_bayar,
        status: 0,
        bukti: req.body.bukti
    }

    pembayaran.create(data)
        .then(result => {
            res.json({
                message: "Data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
// update
app.put("/:id", upload.single('bukti'), async (req, res) => {

    let data = {
        id_tagihan: req.body.id_tagihan,
        bulan_bayar: req.body.bulan_bayar,
        total_bayar: req.body.total_bayar,
        bukti: req.body.bukti,
        id_admin: req.body.id_admin
    };

    let param = {
        id_pembayaran: req.params.id
    }

    pembayaran.update(data, {
            where: param
        })
        .then(result => {
            res.json({
                massage: "data has been updated",
                data: result
            });
        })
        .catch(error => {
            res.json({
                massage: error.massage
            });
        });
});
// delete
app.delete("/:id", async (req, res) => {
    let parameter = {
        id_pembayaran: req.params.id
    }
    pembayaran.destroy({
            where: parameter
        })
        .then(result => {
            res.json({
                massage: 'data has been destroyed',
                data: result
            })
        })
        .catch(error => {
            res.json({
                massage: error.massage
            })
        })
})

module.exports = app