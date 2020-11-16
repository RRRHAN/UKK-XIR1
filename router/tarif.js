const express = require('express');
const app = express();

const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const tarif = require("../models/index").tarif;

// middleware
app.use(express.urlencoded({
    extended: true
}))

// read
app.get("/", async (req, res) => {
    tarif.findAll()
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
        id_tarif: req.params.id
    }
    tarif.findOne({
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    };

    let param = {
        id_tarif: req.params.id
    }

    tarif.update(data, {
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
        id_tarif: req.params.id
    }
    tarif.destroy({
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