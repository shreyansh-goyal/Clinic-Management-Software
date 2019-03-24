const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get('/',(req,res)=>{
    console.log("cookies",req.cookies);
    res.cookie("name","shreyansh").send("cookie set");
    console.log("signed cookies",req.signedCookies);
})
app.listen(process.env.PORT||1111,()=>{
    console.log("server strated at port 1111");
})