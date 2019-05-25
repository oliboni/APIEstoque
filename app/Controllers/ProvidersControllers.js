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
    models.Provider.create(req.body).then(
        providers => res.status(200).send(providers)
    ).catch(err => res.status(500).send("Erro, Verificar "+err))
})

//Get all
router.get('/', security.verifyJWT, function (req, res) {
    models.Provider.findAll({include: {
        model: models.Address
        }}).then(
        providers => res.status(200).send(providers)
    )
})

//Find one by id
router.get('/:idProvider', security.verifyJWT ,function(req, res) {
    models.Provider.findByPk(req.params.id, {include: {model: models.Address, required:true}}).then(providers => {
        if (!providers) {
            res.status(404).send("NOT FOUND")
        }
        res.status(200).send(providers)
    }).catch(err => res.status(500).send(err))
})

//Update
router.put('/:idProvider', security.verifyJWT, function(req, res) {
    models.Provider.findByPk(req.params.id).then(providers => {
        if (!providers) {
            res.status(404).send("NOT FOUND")
        }

        providers.update({
            cnpj: req.body.cnpj,
            name: req.body.name,
            phone: req.body.phone,
            idAddress: req.body.idAddress
        })
        res.status(200).send(providers)
    })

})

//Delete
router.delete('/:idProvider', security.verifyJWT, function (req, res) {
    models.Provider.destroy({
        where:{id: req.params.id}
    }).then(Provider => {
        res.status(200).send("Registro excluido com sucesso")
    }).catch(err => res.status(403).send("Registro não pode ser excluido pois existe Produtos cadastrados para estes fornecedores"))
})


module.exports = router
