const express = require("express");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
const cookieSession = require("cookie-session");
const passportSetup = require("./google2");
const ejs = require("ejs");
const app = express();
const https=require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require("./utils/cors"));
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['thisisasecret']
}));
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session(),function(req,res,next){
    var CronJob = require('cron').CronJob;
    new CronJob('00 00 0-23 * * *', function() {
        const operations = require("../healthcare management/db/helpers/productoperations");
        operations.reminderMail(req);
    }, null, true, 'Asia/Kolkata')
    next();
});
app.use(express.static("public"));
app.get('/google',passport.authenticate('google',{
    scope:['profile','email' ]
    }))
app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        console.log("hello I am in the callback function");
        console.log("I don't know what is happening");
        res.status(200).redirect("/profile/")
    })
app.use("/",(req,res,next)=>{
    if(req.user)
    {
        if(req.url=='/')
        {
            res.redirect("/profile/")
        }
        next();
    }
    else
    {
        console.log(req.url)
        console.log(req.user);
        res.redirect("/login.html")
    }
})
app.set('views', path.join(__dirname, '/public/views'));


app.use('/',require("./API/api"));
//preson have to login for the cron schedule
app.get("/logout",(req,res)=>{
    console.log("I am logging out");
    req.logout();
    res.redirect("/login.html");    
});
app.use("/profile",require("./profile"));

const sslServer=https.createServer(
app);

sslServer.listen(process.env.PORT||8080,()=>{
    console.log(process.env.PORT);
    console.log("server is up at post 1234");
});