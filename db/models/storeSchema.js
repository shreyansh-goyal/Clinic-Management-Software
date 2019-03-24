const mongoose = require("../connection");
const healthcareSchema = mongoose.Schema;
const somethingy = new healthcareSchema({
    duedate:"Date"
});
const medicene = new healthcareSchema({
    Medicene:{
        name:{type:String,required:true,unique:true},
        Ccost:{type:Number,required:true},
        Pcost:{type:Number,required:true},
        discount:{type:Number,required:true},
        gst:{type:Number,required:true},
        units:{type:Number,required:true},
    },
    UserId:{type:String,unique:true,required:true}
});
const Patient = new healthcareSchema({
    Patients:{
        name:{type:String,required:true},
        address:{type:String},
        age:{type:String},
        contact:{type:Number,required:true},
        gender:{type:String,required:true},
        mail:{type:String,required:true},

    },
    UserId:{type:String,unique:true,required:true}

});
const Doctor = new healthcareSchema({
    Doctors:{
        name:{type:String,required:true},
        contact:{type:Number,required:true},
        gender:{type:String,required:true},
        mail:{type:String,required:true},
        willAvailableFrom:{type:String,required:true},
        willAvailableTo:{type:String,required:true},
        domain:{type:String}
    },
    UserId:{type:String,unique:true,required:true}

})
const Appointment = new healthcareSchema({
    Appointment:{
        date:{type:String,required:true},
        doctor:{type:String,required:true},
        time:[{
            timing:{type:Number,required:true},
            appointmentdetails:[{
                booked:{type:Boolean,required:true},bookedBy:{type:String,required:false} 
                       }]}]
    },
    UserId:{type:String,unique:true,required:true}

});
const MediceneConsumed = new healthcareSchema({
    MediceneConsumed :{
        name:{type:String,required:true},
        unitsConsumed:{type:Number,required:true}
    },
    UserId:{type:String,unique:true,required:true}
})
const User = new healthcareSchema({
    email:{type:String,unique:true},
    name:{type:String,required:true},
    photo:{type:String,required:true},
    googleId:{type:String},
    password:{type:String},
    userid:{type:String},
    typeOfUser:{type:String,required:true}
})
const Employee = new healthcareSchema({
    name:{type:String,required:true},
    role:{type:String,required:true},
    UserId:{type:String,unique:true,required:true}
})
const Attendence = new healthcareSchema({
    Date:{type:String,unique:true},
    Attendence:[],
    UserId:{type:String,unique:true,required:true}
})
const Mailhandler=new healthcareSchema({
    UserId:{type:String,unique:true},
    DateOfMail:{type:String,unique:true},
    MediceneMailed:[]
})
const Medicenes = mongoose.model("Medicenes",medicene);
const Doctors= mongoose.model("Doctors",Doctor);
const Appointments= mongoose.model("Appointments",Appointment);
const Patients = mongoose.model("Patients",Patient)
const Consumed = mongoose.model("MediceneConsume",MediceneConsumed);
const Users = mongoose.model("Users",User);
const Employees = mongoose.model("Employees",Employee);
const Attendence1  =mongoose.model("Attendence",Attendence);
const MailHandlers = mongoose.model("MailData",Mailhandler);
module.exports = {
    Medicenes,
    Patients,
    Appointments,
    Doctors,
    Consumed,
    Users,
    Employees,
    Attendence1,
    MailHandlers
};
