const User = require("../model/User")
const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken")
const AuthConfig = require("../config/auth.json")


//Função para gerar o token do usuário

const generateToken = (user)=>{
    return jwt.sign({
        id:user.id,
        nome:user.nome
    }, AuthConfig.secret, {
        expiresIn:86400
    })

}


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
        data: user,
        token: generateToken(user)
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

    

    return res.json(
        {
            user,
            token: generateToken(user)
        })

})



module.exports = router;
