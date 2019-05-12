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
    models.User.create(req.body).then(
        users => res.status(200).send(users)
    ).catch(err => res.status(500).send("Algo de errado não está certo"+err))
})

//Get all
router.get('/', function (req, res) {
    models.User.findAll().then(
        users => res.status(200).send(users)
    )
})

//Find one by id
router.get('/:id', function(req, res) {
    models.User.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(users)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:id', function(req, res) {
    models.User.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send("NOT FOUND")
        }

        users.update({
            password: req.body.password
        })
        res.status(200).send(users)
    })

})

//Delete
router.delete('/:id', function (req, res) {
    models.User.destroy({
        where:{id: req.params.id}
    }).then(User => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router