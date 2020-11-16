const express = require('express');
const app = express();
const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const penggunaan = require("../models/index").penggunaan;

// middleware
app.use(express.urlencoded({
    extended: true
}))

// read
app.get("/", async (req, res) => {
    penggunaan.findAll()
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
        id_penggunaan: req.params.id
    }
    penggunaan.findOne({
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
app.post("/", async (req, res) => {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    penggunaan.create(data)
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
app.put("/:id", async (req, res) => {

    let data = {
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    };

    let param = {
        id_penggunaan: req.params.id
    }

    penggunaan.update(data, {
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
        id_penggunaan: req.params.id
    }
    penggunaan.destroy({
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