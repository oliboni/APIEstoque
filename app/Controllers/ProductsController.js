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
    models.Product.create(req.body).then(
        products => res.status(200).send(products)
    ).catch(err => res.status(500).send("Algo de errado não está certo"+err))
})

//Get all
router.get('/', function (req, res) {
    models.Product.findAll({include: [
        {model: models.Category},
        {model: models.Provider}
        ]}).then(
        products => res.status(200).send(products)
    )
})

//Find one by id
router.get('/:id', function(req, res) {
    models.Product.findByPk(req.params.id, {include: {model: models.Address, required:true}}).then(products => {
        if (!products) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(products)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', function(req, res) {
    models.Product.findByPk(req.params.id).then(products => {
        if (!products) {
            res.status(404).send("NOT FOUND")
        }

        products.update({
            idCategory: req.body.idCategory,
            idProvider: req.body.idProvider,
            name: req.body.name,
            unitPrice: req.body.unitPrice
        })
        res.status(200).send(products)
    })

})

//Delete
router.delete('/:id', function (req, res) {
    models.Product.destroy({
        where:{id: req.params.id}
    }).then(Product => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router