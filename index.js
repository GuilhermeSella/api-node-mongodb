const express = require("express");


const app = express();
const port = 8080




app.listen(port, (error)=>{

    console.log("Servidor rodando!")

    if(error) console.log(error)
})