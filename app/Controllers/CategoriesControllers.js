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
    models.Category.create(req.body).then(
        categories => res.status(200).send(categories)
    ).catch(err => res.status(500).send("Algo de errado não está certo"+err))
})

//Get all
router.get('/', function (req, res) {
    models.Category.findAll(req.body).then(
        categories => res.status(200).send(categories)
    )
})

//Find one by id
router.get('/:id', function(req, res) {
    models.Category.findByPk(req.params.id).then(categories => {
            if (!categories) {
                res.status(404).send("NOT FOUND")
            }
            res.status(200).send(categories)
        }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', function(req, res) {
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
router.delete('/:id', function (req, res) {
    models.Category.destroy({
        where:{id: req.params.id}
    }).then(Category => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router