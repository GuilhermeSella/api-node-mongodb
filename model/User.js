const mongoose = require("../db/db")
const bcryptjs = require("bcryptjs")


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },
    senha:{
        type: String,
        required:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

// Bloco que será executado antes do usuário ser criado

UserSchema.pre("save", async function(next){
    //Criptografando senha 10 vezes
    const hash = await bcryptjs.hash(this.senha, 10);
    console.log(hash);
    this.senha = hash;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;