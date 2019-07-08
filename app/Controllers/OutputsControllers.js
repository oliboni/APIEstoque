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
    models.Output.create(req.body, {include: [{model: models.Product}]}).then(
        outputs => {
            models.Product.findByPk(outputs.idProduct).then(products => {
                if (!products) {
                    res.status(404).send("NOT FOUND")
                }
                products.update({
                    amount: parseInt(req.body.amount) - parseInt(products.amount)
                })
            })
            res.status(200).send(outputs)
        }
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Output.findAll({include:
            {model: models.Product}
        }).then(
        outputs => res.status(200).send(outputs)
    )
})

//Find one by id
router.get('/:id', security.verifyJWT, function(req, res) {
    models.Output.findByPk(req.params.id, {include:
            {model: models.Product, required:true}
        }).then(outputs => {
        if (!outputs) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(outputs)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', security.verifyJWT, function(req, res) {
    models.Output.findByPk(req.params.id).then(outputs => {
        if (!outputs) {
            res.status(404).send("NOT FOUND")
        }

        outputs.update({
            idProduct: req.body.idProduct,
            amount: req.body.amount,
            unitPrice: req.body.unitPrice,
            totalPrice: req.body.totalPrice
        })
        res.status(200).send(outputs)
    })

})

//Delete
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Output.destroy({
        where:{id: req.params.id}
    }).then(Output => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router
