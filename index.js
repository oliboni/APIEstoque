var express = require('express')
var app = express()
var CategoriesControllers = require("./app/Controllers/CategoriesControllers")
var AdressesControllers = require("./app/Controllers/AdressesControllers")
var ProviderControllers = require("./app/Controllers/ProvidersControllers")
var ProductsControllers = require("./app/Controllers/ProductsController")
var InputControllers = require("./app/Controllers/InputControllers")

app.use("/categories", CategoriesControllers)
app.use("/address", AdressesControllers)
app.use("/providers", ProviderControllers)
app.use("/products", ProductsControllers)
app.use("/inputs", InputControllers)

app.listen(3000, function () {
    console.log("Server listening on the port 3000!")
})