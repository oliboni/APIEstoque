//Require
const express = require('express'),
    router = express.Router(),
    models = require('../models'),
    bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

//CRUD

//create
router.post('/', function (req, res) {
    models.Address.create(req.body).then(
        Addresses => res.status(200).send(Addresses)
    ).catch(err => res.status(500).send("Algo de errado não está certo"+err))
})

//Get all
router.get('/', function (req, res) {
    models.Address.findAll(req.body).then(
        Addresses => res.status(200).send(Addresses)
    )
})

//Find one by id
router.get('/:id', function(req, res) {
    models.Address.findByPk(req.params.id).then(Addresses => {
        if (!Addresses) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(Addresses)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', function(req, res) {
    models.Address.findByPk(req.params.id).then(Addresses => {
        if (!Addresses) {
            res.status(404).send("NOT FOUND")
        }

        Addresses.update({
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number
        })
        res.status(200).send(Addresses)
    })

})

//Delete
router.delete('/:id', function (req, res) {
    models.Address.destroy({
        where:{id: req.params.id}
    }).then(Address => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router