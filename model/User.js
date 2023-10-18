const mongoose = require("../db/db")

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

const User = mongoose.model("User", UserSchema);

module.exports = User;