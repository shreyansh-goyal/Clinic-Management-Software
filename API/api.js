const router = require("express").Router();
const Operations = require("../db/helpers/productoperations");
router.get("/",(req,res)=>{
})
router.post("/addMedicene",(req,res)=>{

    Operations.addtomedicene(req.body,res,req);
})
router.post("/addDoctors",(req,res)=>{
    Operations.addtoDoctors(req.body,res,req);
})
router.post("/addPatients",(req,res)=>{
    Operations.addtoPatients(req.body,res,req);
})
router.post("/addAppointment",(req,res)=>{
   var pr = Operations.addtoAppointments(req,res);
   pr.then(data=>{
       res.status(200).json(data);
   })
})
router.get("/getMedicene",(req,res)=>{
    Operations.fetchFromMedicene(req,res)
});
router.get("/getPatients",(req,res)=>{
    var arr = req.query.col;
    Operations.fetchfromPatients(arr,res,req)
})
router.get("/getDoctors",(req,res)=>{
    Operations.fetchfromDoctors(req,res)
})
router.get("/getAppointment",(req,res)=>{
    var arr = req.query.col;
    if(req.query.date)
    {
        Operations.fetchfromAppointments(undefined,res,req.date)
    }
    else
    {
        Operations.fetchfromAppointments(arr,res)
    }
})
router.post('/updateMedicene',(req,res)=>{
    var data = req.body;
    Operations.findandUpdateMedicene(data.toFind,data.toUpdate,res,req);
})
router.post('/fetchAndFillAppointmentInDatabase',(req,res)=>{
    console.log(req.body);
    console.log("I am on the API");
    Operations.fetchAndGenerateAppointmentData(req,res);
}),
router.post('/updateAppointments',(req,res)=>{
    Operations.findandUpdateAppointments(req.body,res);
}),
router.post("/updateMedcieneUnits",(req,res)=>{
    Operations.updateConsumedMedicene(req,res);
})
router.get("/getMediceneSaleRecord",(req,res)=>{
    Operations.fetchMediceneUnits(res,req);
}),
router.post('/addemployee',(req,res)=>{
    Operations.addEmployee(req.body,res,req);
}),
router.get('/fetchemployee',(req,res)=>{
    Operations.fetchEmployee(res,req);
}),
router.post('/uploadattendence',(req,res)=>{
    Operations.uploadAttendence(req,res,req);
})
router.get('/getunits',(req,res)=>{
        Operations.getUnits(req,res);
})
router.get('/checkunits',(req,res)=>{
    console.log("I am the best");
    Operations.CheckMediceneUnits(req);
}),
router.get("/getAttendenceReport",(req,res)=>{
    Operations.getAttendence(req,res);
})
module.exports=router;