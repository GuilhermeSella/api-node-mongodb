const User = require("../model/User")
const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();

// Rota de registro com senha criptografada
router.post("/registrar", async(req,res)=>{

    const {email} = req.body;

    if(await User.findOne({email})){
        return res.status(400).json({
            message:"Usuário já existe"
        })
    }

    const user = await User.create(req.body);

    return res.json({
        message:"Usuário criado com sucesso!",
        data: user
    })
})


// Rota de autenticação
router.post("/authenticate", async(req,res)=>{
    const {email, senha} = req.body;

    const user = await User.findOne({email}).select("+senha");

    if(!user) {
        return res.status(400).json({
            message:"Usuário não encontrado!"
        })
    }

    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({
            message:"Senha inválida"
        })
    }

    user.senha = undefined;

    return res.json(user)

})



module.exports = router;
