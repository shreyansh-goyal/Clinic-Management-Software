const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20");
//const FacebookStratergy = require("passport-facebook");
const Schema = require("./db/models/storeSchema");
passport.serializeUser((user,done)=>{
    console.log("hello");
    console.log(user);
    console.log("this is user id",user.googleId);
    done(null,user.googleId);
})
passport.deserializeUser((id,done)=>{
    console.log("Now the deserialization will be done");
    console.log(id);
    Schema.Users.find({googleId:id}).then((user)=>{
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
        console.log(profile);
        Schema.Users.find({googleId:profile.id},(err,doc)=>{
            {
                if(doc.length>0)
                {
                    console.log("hello I am In  the find");
                    done(null,doc[0]);
                }
                else
                {
                    Schema.Users.create({email:profile._json.email,name:profile.displayName,photo:profile.photos[0].value,googleId:profile.id,typeOfUser:'Google'},(err)=>{
                        if(err)
                        {
                            console.log("some error is occured",err);
                        }
                        else
                        {
                            var user = {email:profile._json.email,name:profile.displayName,photo:profile.photos[0].value,googleId:profile.id,typeOfUser:'Google'}
                            console.log(profile._json.email)
                            console.log("updated the database");
                            done(null,user);
                        }
                    })
                }
            }
        })
    })
)