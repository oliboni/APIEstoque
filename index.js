var express = require('express')
var app = express()
var CategoriesControllers = require("./app/Controllers/CategoriesControllers")

app.use("/categories", CategoriesControllers)

app.listen(3000, function () {
    console.log("Server listening on the port 3000!")
})