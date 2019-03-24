const HealthCare = require("../models/storeSchema");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:'shreyanshgoyal90@gmail.com', // generated ethereal user
      pass: 'i will prove them' // generated ethereal password
    }
  });
// setup email data with unicode symbols
const Operations={
reminderMail1(index,name,googleId,req)
{
    console.log("hello I am shreyansh goyal");
    console.log(name);
    console.log(googleId);
    HealthCare.Patients.find({"Patients.name":name,UserId:googleId},(err,doc)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(req.user[0])
            const path = require('path');
            var filepath=(path.join(__dirname,"../../public/views/Appointment.ejs"))
            console.log(filepath);
            var str = fs.readFileSync(filepath,"utf-8");
            console.log(str);
            var html= ejs.render(str,{name:req.user[0].name,photo:req.user[0].photo,time:time.timing+":"+index*15})
            let mailOptions = {
                from: '"Clinic Management Software" ', // sender address
                to: doc[0].Patients.mail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html
                    };
              transporter.sendMail(mailOptions,(err,data)=>{
                if(err)
                {
                    console.log("following error is occured",err);
                }
                else
                {//see for the docy and doc
                    console.log("data is send successfully");
                }

        })
}
})
},
reminderMail(req)
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    if(dd<10)
    {
        dd="0"+dd
    }
    if(mm<10)
    {
        mm="0"+mm;
    }
    var date = today.getFullYear()+'-'+mm+'-'+dd;
    console.log(date);
    HealthCare.Appointments.find({"Appointment.date":date},(err,doc)=>
    {
        for(time of  doc[0].Appointment.time)
        {
            if(today.getHours()==time)
            {
                for(appointment in time.appointmentdetails)
                {
                    if(time.appointmentdetails[appointment].booked==true)
                    {
                        console.log("lets have some fun");
                        var index = time.appointmentdetails.indexOf(time.appointmentdetails[appointment]);
                        this.reminderMail1(index,time.appointmentdetails[appointment].bookedBy,req.user[0].googleId,req);
                    }
                }
            }
        }
    }
    )
}
,
uploadAttendence(req,res){
    var data = req.body;
    var date = new Date().getDate()+'-'+new Date().getMonth()+'';
    HealthCare.Attendence1.create({Date:date,Attendence:data,UserId:req.user[0].googleId},(err)=>{
    console.log("hello I am creating the data");
    if(err)
    {
        res.status(500).send(err);
        console.log("sending th error to the frontend",err);
    }
    else
    {
        res.status(200).json({message:"data is uploaded"})
    }
})
},
fetchEmployee(res,req){
    HealthCare.Employees.find({UserId:req.user[0].googleId},(err,doc)=>{
        if(err)
        {
            res.status(500).json({message:"Some error is occured",err});
        }
        else
        {
            res.status(200).json({message:"Data Found",data:doc})
        }
    })
},
addEmployee(data,res,req)
{
    if(req.user)
    {
        HealthCare.Employees.create({name:data.name,role:data.role,UserId:req.user[0].googleId},(err,doc)=>{
            if(err)
            {
                res.status(500).json({message:"Some error is occured"});
            }
            else
            {
                res.status(200).json({message:"added in the database"});
            }
        })
    }

}   , 
addtomedicene(data,res,req){
    console.log(req.user);
    if(req.user)
    {
        HealthCare.Medicenes.create({Medicene:{name:data.name,Pcost:data.Pcost,Ccost:data.Ccost,discount:data.discount,gst:data.gst,units:data.units},UserId:req.user[0].googleId},(err)=>{
            if(err)
            {
                res.status(500).json({message:"some error is occured while inserting the data",err});
                console.log(err);
            }
            else
            {
                console.log("hrllo*********************************");
                res.status(200).json({message:"data is inserted successfully"});
            }
        })
    }

},
addtoPatients(data,res,req){
   HealthCare.Patients.create({Patients:{name:data.name,address:data.address,age:data.age,contact:data.contact,gender:data.gender,mail:data.mail},UserId:req.user[0].googleId},(err)=>{
        if(err)
        {
            res.status(500).json({message:"some error is occured while inserting the data",err});
            console.log(err);
        }
        else
        {
            res.status(200).json({message:"data is inserted successfully"});
        }
    })
},
addtoAppointments(req,res){
    if(req.data)
    data=req.data;
    else
    data=req.body;
    return new Promise((resolve,reject)=>{
   HealthCare.Appointments.create({Appointment:{date:data.date,doctor:data.doctor,time:data.time},UserId:req.user[0].googleId},(err)=>{
        if(err)
        {
            console.log(err);
            res.status(500).json({message:"some error is occured while inserting the data",err});
            
        }
        else
        {
            resolve();
        }
    })
})
}, 
addtoDoctors(data,res,req){
    HealthCare.Doctors.create({Doctors:{domain:data.domain,name:data.name,contact:data.contact,gender:data.gender,mail:data.mail,willAvailableFrom:data.willAvailableFrom,willAvailableTo:data.willAvailableTo},UserId:req.user[0].googleId},(err)=>{
        if(err)
        {
            console.log(err);
            res.status(500).json({message:"some error is occured while inserting the data",err});
        }
        else
        {
            res.status(200).json({message:"data is inserted successfully"});
        }
    })
},
findandUpdateMedicene(datatofind,datatoupdate,res,req){
    var obj={UserId:req.user[0].googleId};
    var obj2={};
    for(i in datatofind)
    {
        var key = "Medicene."+i;
        obj[key] = datatofind[i]; 
    }
    for(i in datatoupdate)
    {
        var key = "Medicene."+i;
        obj2[key] = datatoupdate[i];
    }
    console.log("object1",obj);
    console.log("object2",obj2);
    HealthCare.Medicenes.findOneAndUpdate(obj,obj2,(err,doc)=>{
        if(err)
        {
            console.log("I am in serious error");
            console.log(err);
            res.status(404).json({
                message:"Data not found"
            })
        }
        else
        {
            console.log(datatoupdate);
            console.log("***************************************************************************************")
            res.status(200).json({mesage:"UpdateSuccessfully"});
        }
    })
},
findandUpdateAppointments(data,res)
{
    console.log("this is the data",data[0].Appointment.date);
    HealthCare.Appointments.findOneAndUpdate({"Appointment.date":data[0].Appointment.date,"Appointment.doctor":data[0].Appointment.doctor},{"Appointment.time":data[0].Appointment.time},(err,doc)=>{
        if(err)
        {
            console.log(err);
            res.status(500).json({err});
        }
        else
        {
            console.log(doc);
            res.status(200).json({message:"data updated successfully"});
        }
    })
}
, 
fetchFromMedicene(req,res){
    var columnarr = req.query.col;
    if(columnarr)
    {
        for(i of columnarr)
        {
            str+="Medicene."+i;
            str+=" ";
        }
        HealthCare.Medicenes.find({UserId:req.user[0].googleId},str,(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({ message:"Some error is occured",err   })
            }
            else
            {
                console.log(doc);
                res.status(200).json({data:doc})
            }
        })
        console.log(str);
    }
    else
    {
        HealthCare.Medicenes.find({UserId:req.user[0].googleId},(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({
                 message:"Some error is occured",
                 err   
                })
            }
            else
            {
                console.log("I am getting the medicene",doc);
                res.status(200).json({
                    data:doc
                })
            }
        }) 
    }
},
fetchfromPatients(columnarr,res,req){
    var str=""
    if(columnarr)
    {
        for(i of columnarr)
        {
            str+="Patients."+i;
            str+=" ";
        }
        HealthCare.Patients.find({UserId:req.user[0].googleId},str,(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"Some error is occured",err   })
            }
            else
            {
                res.status(200).json({data:doc})
            }
        })
    }
    else
    {
        HealthCare.Patients.find({UserId:req.user[0].googleId},(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"Some error is occured",err})
            }
            else
            {
                res.status(200).json({data:doc})
            }
        }) 
    }

},
fetchfromDoctors(req,res,doctorname){
    var columnarr =req.query.col;
    var str=""
    console.log("hello1")
    if(columnarr)
    {
        for(i of columnarr)
        {
            str+="Doctors."+i;
            str+=" ";
        }
        HealthCare.Doctors.find({UserId:req.user[0].googleId},str,(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"Some error is occured",err   })
            }
            else
            {
                
                    res.status(200).json({data:doc});
                
            }
        })
    }
    else
    {
        console.log("hello");
        if(doctorname)
        {

            console.log("hello")
            return new Promise((resolve,reject)=>{
                HealthCare.Doctors.find({"Doctors.name":doctorname,UserId:req.user[0].googleId},(err,doc)=>{
                    if(err)
                    {
                        console.log(err);
                        res.status(500).json({message:"Some error is occured",err})
                    }
                    else
                    {
                        resolve(doc);
                    }
                }) 
            })
        }
        else
        {
            HealthCare.Doctors.find({UserId:req.user[0].googleId},(err,docs)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.status(500).json({data:docs})                    
                }
            })
        }
    }

},
/**to clean this code I have feeded the date that is causing me code that date part again and again this will not work it is taking time */
fetchAndGenerateAppointmentData(req,res)
{
 var data=req.body;
 req.query.col=undefined;   
//data will have doctor name,date, I will set the timings if timings are available then I will fetch those timings and provide to the frontend
    HealthCare.Appointments.find({"Appointment.date":data.date,"Appointment.doctor":data.doctor,UserId:req.user[0].googleId},(err,doc)=>{
        if(err)
        {
            res.status(500).json({message:"Some Error fetching the data wrt to dates",err});
        }
        else
        {
            console.log(doc);
            if(doc.length>0)
            {
                console.log("the document is as follows",doc);
                res.status(200).json({data:doc});
            }
            else
            {
                    console.log("document not found");
                    this.fetchfromDoctors(req,res,data.doctor).then(data1=>{
                    console.log(data1);
                    var arr=[];
                    var from=new Date(data1[0].Doctors.willAvailableFrom).getHours();
                    var to = new Date(data1[0].Doctors.willAvailableTo).getHours();
                    console.log("from",from,"to",to);
                    for(var i=from;i<to;i++)
                    {
                        var obj={};
                        obj.timing=i;
                        obj.appointmentdetails=[
                            {booked:false},{booked:false},{booked:false},{booked:false}
                        ]
                        arr.push(obj);
                    }
                    data.time=arr;
                    req.data=data;
                    console.log("this is the data",req.data)
                    this.addtoAppointments(req,res)
                    .then(information=>{
                        HealthCare.Appointments.find({"Appointment.date":data.date,"Appointment.doctor":data.doctor,UserId:req.user[0].googleId},(err,doc)=>{
                            if(err)
                            {
                                res.status(500).json({message:"Some Error fetching the data wrt to dates",err});
                            }
                            else
                            {
                                console.log(doc);
                                if(doc.length>0)
                                {
                                    res.status(200).json({data:doc});
                                }
                            }
                        })                    
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({message:"Some error is occured",err})
                })
            }
        }
    })
},
fetchfromAppointments(columnarr,res){
    var str=""
    if(columnarr)
    {
        for(i of columnarr)
        {
            str+="Appointment."+i;
            str+=" ";
        }
        HealthCare.Appointments.find({},str,(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"Some error is occured",err   })
            }
            else
            {
                res.status(200).json({data:doc})
            }
        })
    }
    else
    {
        HealthCare.Appointments.find({},(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"some error has occured"})
            }
            else
            {
                res.status(200).json({data:doc});
            }
        })
    }
},
//how to play with the promise here
updateConsumedMedicene(req,res)
{
    var data=req.body;
    console.log("this is the data I want",data);
    var arr=[];
    for(medicene of data)
    {
        var pr = this.updateMediceneStock(medicene,req);
        arr.push(pr);
    }
    Promise.all(arr).then(()=>{
        res.status(200).json({message:"data inserted successfully"});
    })
    .catch(()=>{
        res.status(500).json({message:"data is not inserted successfully"});
    })
},
updateMediceneStock(data,req)
{
    return new Promise((resolve,reject)=>{
        HealthCare.Consumed.find({"MediceneConsumed.name":data.name,UserId:req.user[0].googleId},(err,doc)=>{
            if(err)
            {
                reject();
            }
            else
            {
                console.log("here is the data****************************************************",doc);
                if(doc.length>0)
                {
                    console.log(doc);
                    data.units+=doc[0].MediceneConsumed.unitsConsumed;
                    HealthCare.Consumed.findOneAndUpdate({"MediceneConsumed.name":data.name},{"MediceneConsumed.unitsConsumed":data.units},(err,docs)=>{
                        if(err)
                        {
                            reject();
                        }
                        else
                        {
                            resolve();
                        }
                    });
                }
                else
                {
                    HealthCare.Consumed.create({MediceneConsumed:{name:data.name,unitsConsumed:data.units},UserId:req.user[0].googleId},(err)=>{
                        if(err)
                        {
                            reject();
                        }
                        else
                        {
                            resolve(); 
                        }
                    })
                }
            }
        })
        
    }) 
},
fetchMediceneUnits(res,req)
{
    HealthCare.Consumed.find({UserId:req.user[0].googleId},(err,doc)=>{
        if(err)
        {
            res.status(500).json({err})
        }
        else
        {
            res.status(200).json(doc);
        }
    })
},
getUnits(req,res)
{
    var name = req.query.name;
    console.log(name);
    HealthCare.Medicenes.find({"Medicene.name":name,UserId:req.user[0].googleId},(err,doc)=>{
        if(err)
        {
            res.status(500).json({message:"Some error is occured at the server"})
        }
        else
        {
            console.log(doc);
            res.status(200).json(doc);
        }
    })
},
CheckMediceneUnits(req)
{   
    const path  = require("path");
    HealthCare.Medicenes.find({"Medicene.units":{$lt:10}},(err,medicenedata)=>{
        console.log("hello");
        console.log("the medicene details are as follows",medicenedata);
        if(err)
        {
            console.log("Some error is occured")
        }
        else{
            var date=new Date().getDate+"-"+new Date().getMonth+"-"+new Date().getFullYear;
            HealthCare.MailHandlers.find({DateOfMail:date,UserId:req.user[0].googleId},(err,mediceneMailed)=>{
                if(err)
                console.log("some error is occured")//some error is occured here
                else
                {
                    if(mediceneMailed.length<=0)
                    {
                        const path  = require("path");
                        var str = fs.readFileSync(path.join(__dirname,"../../public/views/Email.ejs"),"utf-8");
                        var html = ejs.render(str,{data:medicenedata});
                        let mailOptions = {
                            from: '"Clinic Management Software" ', // sender address
                            to: req.user[0].email, // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html
                          };
                          console.log(html);
                        transporter.sendMail(mailOptions,(err,data)=>{
                            if(err)
                            {
                                console.log("following error is occured",err);
                            }
                            else
                            {//see for the docy and doc
                                console.log("data is send successfully");
                                HealthCare.MailHandlers.create({DateOfMail:date,UserId:req.user[0].googleId,MediceneMailed:medicenedata},(err)=>{
                                    if(err)
                                    {
                                        console.log("Some error is occured",err);
                                    }
                                    else
                                    {
                                        console.log("data is feeded success fully");
                                    }
                                })
                            }
                        });
                    }
                    else
                    {
                        var newArray = medicenedata.filter(e=>{
                        console.log("Medicene Mailed",mediceneMailed[0].MediceneMailed);
                        for (element of mediceneMailed[0].MediceneMailed)
                        {
                            if(element.Medicene.name==e.Medicene.name)
                            {
                                return false;
                            }
                        }
                        console.log("someone is left*********************************");
                        return true;
                    })
                    console.log(newArray);
                        if(newArray.lenght>0)
                        {
                            const path  = require("path");
                            var str = fs.readFileSync(path.join(__dirname,"../../public/views/Email.ejs"),"utf-8");
                            console.log(medicenedata);
                            console.log("New Array",newArray)
                            var html = ejs.render(str,{data:newArray});
                            console.log("this is the new html",html)
                            let mailOptions = {
                                from: '"Clinic Management Software" ', // sender address
                                to: req.user[0].email, // list of receivers
                                subject: "Hello ✔", // Subject line
                                text: "Hello world?", // plain text body
                                html
                              };
                              transporter.sendMail(mailOptions,(err,data)=>{
                                if(err)
                                {
                                    console.log("following error is occured",err);
                                }
                                else
                                {//see for the docy and doc
                                    console.log("data is send successfully");
                                    HealthCare.MailHandlers.findOneAndUpdate({DateOfMail:date,UserId:req.user[0].googleId},{MediceneMailed:medicenedata},(err)=>{
                                        if(err)
                                        {
                                            console.log("Some error is occured",err);
                                        }
                                        else
                                        {
                                            console.log("data is feeded success fully");
                                        }
                                    })
                                }
                            });
                        }
                    }
                }
            });

        }
    })
},
getAttendence(req,res)
{
 HealthCare.Attendence1.find({UserId:req.user[0].googleId},(err,doc)=>{
    var object={persondata:[],totalAttendence:0};
    console.log(object.persondata)
    for(i of doc)
    {object.totalAttendence++;
        for(j of i.Attendence)
        {
            var obj={};
            var found=false;
            object.persondata.forEach(e=>{
                if(e.name==j.name)
                {
                    if(j.present==true)
                    {
                        found=true
                        e.totalPresent+=1;
                    }
                    else
                    {
                        found=true
                    }
                }
            })
            if(found==false)
            {
                console.log(j);
                obj.name=j.name;
                if(j.present==true)
                obj.totalPresent=1
                else
                obj.totalPresent=0;
                object.persondata.push(obj);
            }
            console.log(j);
        }
    }
    res.json({data:object});
console.log(object);
 })   
}
}
module.exports = Operations;