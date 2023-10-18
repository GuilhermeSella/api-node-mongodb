const mongoose = require("mongoose");

const stringConnect = "mongodb+srv://masterlygui05:password123123@clusterapimongo.bgzx7qp.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(stringConnect)
.then(()=>{
    console.log("Conectado ao mongodb")
})
.catch((error)=>{
    console.log("Erro de conexão ao mongodb" + error)
})

mongoose.Promise = global.Promise;


module.exports = mongoose;