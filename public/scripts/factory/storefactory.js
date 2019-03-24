app.factory("storefactory",()=>{
    const obj={
        addMediceneToDatabase(MediceneObj){
            var promise = firebase.database().ref(`Store/Medicene/${MediceneObj.name}`).set(MediceneObj);
            return promise;
        },
        getMediceneList(){
            var reference = firebase.database().ref(`Store/Medicene`);
            return reference;
        },
        addPatientsToDatabase(Patient){
            var promise = firebase.database().ref(`PatientsAndDoctors/Patient/${Patient.name}${Patient.phoneNo}`).set(Patient);
            return promise;
        },
        addDoctorsToDatabase(Doctor){
            var promise = firebase.database().ref(`PatientsAndDoctors/Doctor/${Doctor.name}${Doctor.contactNo}`).set(Doctor);
            return promise;
        },
        getdoctors(){
            var reference = firebase.database().ref(`PatientsAndDoctors/Doctor`);
            return reference;
        },
        getpatients(){
            var reference = firebase.database().ref(`PatientsAndDoctors/Patient`);
            return reference; 
        },
        addAppointmentsToDatabase(date,doctorname,time){
            if(time)
            {
                var reference = firebase.database().ref(`Appointments/${date}/${doctorname}/${time}`);
                console.log(`Appointments/${date}/${doctorname}/${time}`);
                return reference;
            }
            else
            {
                var reference = firebase.database().ref(`Appointments/${date}/${doctorname}`);

                return reference;
            }

        },
        createAppointments(date,doctorname,timings,data,time){
            if(!data)
            {
                var object =[
                    {
                        booked:false,
                        bookedBy:false
                    },
                    {
                        booked:false,
                        bookedBy:false
                    },
                    {
                        booked:false,
                        bookedBy:false
                    },
                    {
                        booked:false,
                        bookedBy:false
                    }
                ]
                var flag=0;
                var flag1=0;
                var promise;
                for(i of timings)
                {
                    if(i.time!=100)
                    {
                        console.log("hello I am in the store factory");
                        promise = firebase.database().ref(`Appointments/${date}/${doctorname}/${i.time}`).set(object);
                        flag1=0;
                        promise.catch(err=>{
                            flag=1;
                        })  
                    }
            
                }
                if(flag==1){
                    return  Promise((resolve,reject)=>{
                        reject("Cannot insert the data properly")
                    }
                    )
                }
                else{
                    return promise;
                }
            }
            else
            {
                promise = firebase.database().ref(`Appointments/${date}/${doctorname}/${time}`).set(data);
                return promise;
            }
        }
        
    };
return obj;
})