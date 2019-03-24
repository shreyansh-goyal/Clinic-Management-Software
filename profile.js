const router =require("express").Router();
router.get('/',checkauth,(req,res)=>{
console.log("the session is",req.session.passport.user);
res.render("index",{name:req.user[0].name,img:req.user[0].photo});
//res.redirect("localhost:5500/")
})
function checkauth(req,res,next)
{
    console.log("inside the checkauth function");
    if(req.user)
    {
        console.log(req.user);
        console.log("req.user exsist");
        next();
    }
    else
    {
        res.redirect("/google");
    }
}
module.exports = router;

