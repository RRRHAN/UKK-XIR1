const express = require('express');
const app = express();

const tagihan = require("../models/index").tagihan;
const penggunaan = require("../models/index").penggunaan;

// middleware
app.use(express.urlencoded({
    extended: true
}))

// read
app.get("/", async (req, res) => {
    tagihan.findAll()
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
        id_tagihan: req.params.id
    }
    tagihan.findOne({
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
        id_penggunaan: req.body.id_penggunaan,
        status: req.body.status
    }

    let penggunaan_params = {
        id_penggunaan: data.id_penggunaan
    }

    penggunaan.findOne({
            where: penggunaan_params
        }).then(result => {
            let jumlah_meter = result.dataValues.meter_akhir - result.dataValues.meter_awal
            data.jumlah_meter = jumlah_meter
            data.bulan = result.dataValues.bulan
            data.tahun = result.dataValues.tahun
            tagihan.create(data)
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
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
// update
app.put("/:id", async (req, res) => {

    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: req.body.status
    };

    let param = {
        id_tagihan: req.params.id
    }

    tagihan.update(data, {
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
        id_tagihan: req.params.id
    }
    tagihan.destroy({
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