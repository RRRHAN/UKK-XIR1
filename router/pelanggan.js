const express = require('express')
const app = express()
const md5 = require('md5')

const verifyAdmin = require('./Verifyadmin')

app.use(verifyAdmin)

const pelanggan = require("../models/index").pelanggan

// middleware
app.use(express.urlencoded({
  extended: true
}))

// read
app.get("/", async (req, res) => {
  pelanggan.findAll()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.json({
        massage: error.massage
      })
    })
})
//read one
app.get('/:id', async (req, res) => {
  let param = {
    id_pelanggan: req.params.id
  }
  pelanggan.findOne({
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
    username: req.body.username,
    password: md5(req.body.password),
    nomor_kwh: req.body.nomor_kwh,
    nama_pelanggan: req.body.nama_pelanggan,
    alamat: req.body.alamat,
    id_tarif: req.body.id_tarif,
  }

  pelanggan.create(data)
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
    username: req.body.username,
    password: md5(req.body.password),
    nomor_kwh: req.body.nomor_kwh,
    nama_pelangan: req.body.nama_pelangan,
    alamat: req.body.alamat,
    id_tarif: req.body.id_tarif,
  }

  let param = {
    id_pelanggan: req.params.id
  }

  pelanggan
    .update(data, {
      where: param
    })
    .then(result => {
      res.json({
        massage: "data has been updated",
        data: result
      })
    })
    .catch(error => {
      res.json({
        massage: error.massage
      })
    })
})
// delete
app.delete("/:id", async (req, res) => {
  let parameter = {
    id_pelanggan: req.params.id
  }
  pelanggan.destroy({
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