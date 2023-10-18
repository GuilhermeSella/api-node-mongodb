const User = require("../model/User")
const express = require("express")
const router = express.Router();


router.post("/registrar", (req,res)=>{

    const {email} = req.body;

    if(User.findOne({email})){
        return res.json({
            message:"Usuário já existe"
        })
    }


    return res.json({
        message:"Registrar"
    })
})

module.exports = router;
