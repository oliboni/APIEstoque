//Require
const express = require('express'),
    router = express.Router(),
    models = require('../models'),
    bodyParser = require('body-parser'),
    security = require('../helpers/security')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

//CRUD

//create
router.post('/', function (req, res) {
    models.Address.create(req.body).then(
        Addresses => res.status(200).send(Addresses)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Address.findAll(req.body).then(
        Addresses => res.status(200).send(Addresses)
    )
})

//Find one by id
router.get('/:id', security.verifyJWT, function(req, res) {
    models.Address.findByPk(req.params.id).then(Addresses => {
        if (!Addresses) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(Addresses)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', security.verifyJWT, function(req, res) {
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
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Address.destroy({
        where:{id: req.params.id}
    }).then(Address => {
        res.status(200).send("Registro excluido com sucesso")
    }).catch(err => res.status(403).send("Registro não pode ser excluido pois existe Fornecedores cadastrados nestes endereços"))
})


module.exports = router