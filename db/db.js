const mongoose = require("mongoose");

const stringConnect = "mongodb+srv://masterlygui05:<password123123>@clusterapimongo.bgzx7qp.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(stringConnect, {}, (error)=>{
    if(error) console.log("Falha na autenticação do mongodb" + error)


    console.log("Conectado ao mongodb!")


})

mongoose.Promise = global.Promise;


module.exports = mongoose;