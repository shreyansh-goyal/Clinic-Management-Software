const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./google2")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['thisisasecret']
}));
app.use(passport.initialize());
app.use(passport.session());
// app.get("/facebook",passport.authenticate('facebook',{
//     scope:['profile']
// }));
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/google");
});
// app.get('/callback',passport.authenticate('facebook'),(req,res)=>{
//     console.log("we will get the response");
// });
app.use("/profile",require("./profile"));
app.get('/google',passport.authenticate('google',{
scope:['profile']
}))
app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
    console.log("hello I am in the callback function");
    res.redirect("/profile/");
})
app.listen(process.env.PORT||2415,()=>{
    console.log("server started at port 1234")
})