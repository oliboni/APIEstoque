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
    models.Product.create(req.body).then(
        products => res.status(200).send(products)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Product.findAll({include: [
        {model: models.Category},
        {model: models.Provider}
        ]}).then(
        products => res.status(200).send(products)
    )
})

//Find one by id
router.get('/:idProduct', security.verifyJWT, function(req, res) {
    models.Product.findByPk(req.params.id, {include: [
        {model: models.Category, required:true},
        {model: models.Provider, required:true}
    ]}).then(products => {
        if (!products) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(products)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:idProduct', security.verifyJWT, function(req, res) {
    models.Product.findByPk(req.params.id).then(products => {
        if (!products) {
            res.status(404).send("NOT FOUND")
        }

        products.update({
            idProduct: req.body.idProduct,
            idProvider: req.body.idProvider,
            name: req.body.name,
            unitPrice: req.body.unitPrice,
            amount: req.body.amount
        })
        res.status(200).send(products)
    })

})

//Delete
router.delete('/:idProduct', security.verifyJWT, function (req, res) {
    models.Product.destroy({
        where:{id: req.params.id}
    }).then(Product => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router
