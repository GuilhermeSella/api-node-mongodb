module.exports = (req,res,next)=>{


    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error:"Token não fornecido!"
        })
    }

    const partsToken = authHeader.split(" ");

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


    next()
}