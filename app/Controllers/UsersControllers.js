//Require
const express = require('express'),
    router = express.Router(),
    models = require('../models'),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    security = require('../helpers/security')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

//CRUD

//create
router.post('/', function (req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10)

    models.User.create({
        name: req.body.name,
        login: req.body.login,
        password: hash
    }).then(
        users => res.status(200).send(users)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.User.findAll().then(
        users => res.status(200).send(users)
    )
})

//Find one by id
router.get('/:idUser', security.verifyJWT, function(req, res) {
    models.User.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(users)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:idUser', security.verifyJWT, function(req, res) {
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
router.delete('/:idUser', security.verifyJWT, function (req, res) {
    models.User.destroy({
        where:{id: req.params.id}
    }).then(User => {
        res.status(200).send("Registro excluido com sucesso")
    })
})


module.exports = router
