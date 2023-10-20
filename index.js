const express = require("express");
const router = require("./routes/router")
const AuthController = require("./controller/AuthController")
const AdminController = require("./controller/AdminController")
const AuthenticateMiddleware = require("./services/authenticate")
const app = express();
const port = 8080

app.use(express.json())
app.use("/", router)
app.use("/auth", AuthController)
app.use("/admin", AuthenticateMiddleware, AdminController)



app.listen(port, (error)=>{

    console.log("Servidor rodando!")

    if(error) console.log(error)
})