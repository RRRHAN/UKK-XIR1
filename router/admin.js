const express = require('express');
const app = express();
const md5 = require('md5')
const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const admin = require("../models/index").admin;

// middleware
app.use(express.urlencoded({
    extended: true
}))

// read
app.get("/", async (req, res) => {
    admin.findAll()
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
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }

    admin.create(data)
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
        id_admin: req.params.id
    }
    admin.findOne({
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
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    };

    let param = {
        id_admin: req.params.id
    }

    admin.update(data, {
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
        id_admin: req.params.id
    }
    admin.destroy({
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