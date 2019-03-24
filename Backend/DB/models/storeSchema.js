const mongoose = require("../connection");
const Schema  =  mongoose.Schema;
const User = new Schema({
    name:{type:String,required:true},
    photo:{type:String,required:true},
    googleId:{type:String},
    password:{type:String},
    userid:{type:String},
    typeOfUser:{type:String,required:true}
})
const Users = mongoose.model("Users",User);
module.exports = {
    Users
};
