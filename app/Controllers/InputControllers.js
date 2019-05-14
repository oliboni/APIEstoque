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
router.post('/', security.verifyJWT, function (req, res) {
    models.Input.create(req.body).then(
        inputs => res.status(200).send(inputs)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Input.findAll({include: [
            {model: models.Product},
            {model: models.Provider}
        ]}).then(
        inputs => res.status(200).send(inputs)
    )
})

//Find one by id
router.get('/:id', security.verifyJWT, function(req, res) {
    models.Input.findByPk(req.params.id, {include: [
        {model: models.Product, required:true},
        {model: models.Provider, required: true}

    ]}).then(inputs => {
        if (!inputs) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(inputs)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', security.verifyJWT, function(req, res) {
    models.Input.findByPk(req.params.id).then(inputs => {
        if (!inputs) {
            res.status(404).send("NOT FOUND")
        }

        inputs.update({
            idCategory: req.body.idCategory,
            idProvider: req.body.idProvider,
            date: req.body.date,
            amount: req.body.amount,
            unitPrice: req.body.unitPrice,
            totalPrice: req.body.totalPrice
        })
        res.status(200).send(inputs)
    })

})

//Delete
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Input.destroy({
        where:{id: req.params.id}
    }).then(Input => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router