const jwt = require("jsonwebtoken")
const AuthConfig = require("../config/auth.json")

module.exports = (req,res,next)=>{

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error:"Token não fornecido!"
        })
    }

    const partsToken = authHeader.split(" ");
    console.log(partsToken)

    if(partsToken.length !== 2){
        return res.status(401).json({
            "error":"Token inválido"
        })
    }

    const [scheme, token] = partsToken;

    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            "error":"Formatação de Token inválida"
        })
    }

    return jwt.verify(token, AuthConfig.secret, (error, decoded)=>{

        console.log(error);
        console.log(decoded)

        if(error){
            return res.status(401).json({
                message:"Token inválido ou expirado"
            })
        }

        req.userLogged = decoded;

        
        return next()
    })

    next()
}