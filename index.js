var express = require('express')
var app = express()
require("dotenv-safe").load()

var CategoriesControllers = require("./app/Controllers/CategoriesControllers")
var ProviderControllers = require("./app/Controllers/ProvidersControllers")
var ProductsControllers = require("./app/Controllers/ProductsController")
var InputControllers = require("./app/Controllers/InputControllers")
var OutputsControllers = require("./app/Controllers/OutputsControllers")
var UsersControllers = require("./app/Controllers/UsersControllers")
var LoginController = require("./app/Controllers/LoginController")
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})

app.use("/categories", CategoriesControllers)
app.use("/providers", ProviderControllers)
app.use("/products", ProductsControllers)
app.use("/inputs", InputControllers)
app.use("/outputs", OutputsControllers)
app.use("/users", UsersControllers)
app.use("/login", LoginController)

app.listen(3000, function () {
    console.log("Server listening on the port 3000!")
})
