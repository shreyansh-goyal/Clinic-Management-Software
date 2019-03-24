const mongoose = require("mongoose");
const dbConfig = require("../utils/config").dbConfig;
console.log(dbConfig);
mongoose.connect(dbConfig,{poolSize:10},(err)=>{
    if(err){
        console.log("Can't Create DB Connection ");
        console.log(err);
    }
    else{
        console.log("Connection Created...");
    }
});
module.exports = mongoose;
