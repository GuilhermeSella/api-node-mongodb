const User = require("../model/User")
const express = require("express")
const router = express.Router();


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

module.exports = router;
