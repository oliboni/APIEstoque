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
    models.Output.create(req.body).then(
        outputs => res.status(200).send(outputs)
    ).catch(err => res.status(500).send("Algo de errado não está certo"+err))
})

//Get all
router.get('/', function (req, res) {
    models.Output.findAll({include:
            {model: models.Product}
        }).then(
        outputs => res.status(200).send(outputs)
    )
})

//Find one by id
router.get('/:id', function(req, res) {
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
router.put('/:id', function(req, res) {
    models.Output.findByPk(req.params.id).then(outputs => {
        if (!outputs) {
            res.status(404).send("NOT FOUND")
        }

        outputs.update({
            idProvider: req.body.idProvider,
            amount: req.body.amount,
            unitPrice: req.body.unitPrice,
            totalPrice: req.body.totalPrice
        })
        res.status(200).send(outputs)
    })

})

//Delete
router.delete('/:id', function (req, res) {
    models.Output.destroy({
        where:{id: req.params.id}
    }).then(Output => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router