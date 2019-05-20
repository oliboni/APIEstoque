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
    models.Category.create(req.body).then(
        categories => res.status(200).send(categories)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Category.findAll(req.body).then(
        categories => res.status(200).send(categories)
    )
})

//Find one by id
router.get('/:id', security.verifyJWT, function(req, res) {
    models.Category.findByPk(req.params.id).then(categories => {
            if (!categories) {
                res.status(404).send("NOT FOUND")
            }
            res.status(200).send(categories)
        }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', security.verifyJWT, function(req, res) {
    models.Category.findByPk(req.params.id).then(categories => {
        if (!categories) {
            res.status(404).send("NOT FOUND")
        }

        categories.update({
            name: req.body.name
        })
        res.status(200).send(categories)
    })

})

//Delete
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Category.destroy({
        where:{id: req.params.id}
    }).then(Category => {
        res.status(200).send("Registro excluido com sucesso")
    }).catch(err => res.status(403).send("Registro não pode ser excluido pois existe Produtos nesta categoria"))
})


module.exports = router