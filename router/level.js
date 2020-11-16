const express = require('express');
const app = express();
const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const level = require("../models/index").level;

// middleware
app.use(express.urlencoded({
    extended: true
}))

// read
app.get("/", async (req, res) => {
    level.findAll()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({
                massage: error.massage
            });
        });
});
// create
app.post("/", async (req, res) => {
    let data = {
        nama_level: req.body.nama_level
    }

    level.create(data)
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
//read one
app.get('/:id', async (req, res) => {
    let param = {
        id_level: req.params.id
    }
    level.findOne({
        where: param
    }).then(result => {
        res.json(result)
    }).catch(error => {
        res.json({
            massage: error.massage
        })
    })
})
// update
app.put("/:id", async (req, res) => {

    let data = {
        nama_level: req.body.nama_level
    };

    let param = {
        id_level: req.params.id
    }

    level.update(data, {
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
        id_level: req.params.id
    }
    level.destroy({
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