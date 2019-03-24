const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20");
const fetch = require("node-fetch");
//const FacebookStratergy = require("passport-facebook");
const Schema = require("./DB/models/storeSchema");
passport.serializeUser((user,done)=>{
    console.log("hello");
    console.log(user);
    console.log("this is user id",user.id);
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    console.log("Now the deserialization will be done");
    console.log(id);
    Schema.Users.findById(id).then((user)=>{
        done(null,user);
    })
})
// passport.use(new FacebookStratergy({
//     clientID:'2049830411806838',
//     clientSecret: 'd85ab49505e3c1bee8e19f1da3b21dd6',
//     callbackURL: "http://localhost:1234/callback"
// },function(accessToken, refreshToken, profile, done)
// {
//     console.log(profile);
// }))
passport.use(
    new GoogleStratergy({
        callbackURL:"/auth/google/callback",
        clientID: '698738936640-ftk2mu6fdnfsbn0tej7rod2o1saqeb0s.apps.googleusercontent.com',
        clientSecret:'N0RbEmLpjP52sJnbtjKIv5eX'
    },(token, refreshToken, profile, done)=>{
        Schema.Users.find({googleId:profile.id},(err,doc)=>{
            {
                if(doc.length>0)
                {
                    console.log("hello I am In");
                    done(null,doc[0]);
                }
                else
                {
                    Schema.Users.create({name:profile.displayName,photo:profile.photos[0].value,googleId:profile.id,typeOfUser:'Google'},(err,doc)=>{
                        if(err)
                        {
                            console.log("some error is occured",err);
                        }
                        else
                        {
                            console.log(doc[0]);
                            console.log("updated the database");
                            done(null,doc[0]);
                        }
                    })
                }
            }
        })
    })
)