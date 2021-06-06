app.controller("calenderpagecontroller",function($scope,storefactory){
    $scope.patient={};
    $scope.filldetails=false;
    $scope.doctor={};
    $scope.appointment={};
    $scope.doctors=[];
    $scope.patients=[];
    $scope.timings=[];
    $scope.availabletimings=[];
    $scope.doctorsAppointment=[];
    var doctorsAppointment=[];
    var availabletimings=[];
    var doctorName;
    var availabletimingdata=[];
    var todaysdate = new Date();
    $scope.firstday = getdate(todaysdate);
    $scope.secondday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.thirdday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.fourthday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.fifthday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.sixthday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.seventhday = getdate(todaysdate.setDate(todaysdate.getDate()+1));
    $scope.$apply
    getDoctors();
    getPatients();
    //this function adds the patient to the database
    $scope.addPatient=()=>{
        if(validate("patient"))
        {   var close = document.querySelector("#addpatient");
            close.setAttribute("data-dismiss","modal");
                fetch("http://localahost:1234/addPatients",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify($scope.patient) 
        }).then(data=>{
            alert("Patient details are uploaded");
            console.log(data);
        }).catch(err=>{
            alert("Unable to update the details")
            console.log(err);
        })
    }
}
    //this function adds the doctor to the database
    $scope.addDoctor=()=>{
        
        if(validate("doctor"))
        {
            var close = document.querySelector("#adddoctor");
            close.setAttribute("data-dismiss","modal");
            $scope.doctor.willAvailablefrom=$scope.doctor.willAvailableFrom.getHours();
            $scope.doctor.willAvailableto=$scope.doctor.willAvailableTo.getHours(); 
            console.log($scope.doctor.willAvailableFrom);
            console.log($scope.doctor.willAvailableTo); 

            fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/addDoctors",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify($scope.doctor) 
                }).then(data=>{
                    alert("Doctors details are uploaded");
                    data.json().then(data=>{
                        console.log(data);
                        $scope.doctors.push({Doctors:$scope.doctor})
                    ;
                    console.log($scope.doctors);
                    $scope.$apply();
                    })
                }).catch(err=>{
                    alert("Unable to update the details");
                    err.json().then(data=>{
                        console.log(data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
        }
    }
    $scope.getDoctorTime=()=>{
        if($scope.appointment.doctorname)
        {
            $scope.timings=[];
            var doctor=$scope.doctors.filter(e=>
               e.Doctors.name==$scope.appointment.doctorname)[0];
               console.log("currently working on it",doctor);
               console.log(doctor.Doctors.willAvailableFrom);
               var from = new Date(doctor.Doctors.willAvailableFrom).getHours();
               var to =new Date(doctor.Doctors.willAvailableTo).getHours();
               console.log("from",from,"to",to);
               var array=[];
               for(var i = from;i<to;i++)
               {
                   console.log(`Between ${i} and ${i+1}`);
                $scope.timings.push({name:`Between ${i} and ${i+1}`,time:i});
               }       
        }
    }
    //this function supplies date
    function getdate(today)
    {
        today = new Date(today);
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        if(dd<10)
        {
            dd="0"+dd;
        }
        if(mm<10)
        {
            mm="0"+mm;
        }
        var date=`${today.getFullYear()}-${mm}-${dd}`;
        return date;
    }
    $scope.getAvailableTime=()=>{
        var day=$scope.appointment.date;
        var doctorname = $scope.appointment.doctorname;
        var time = $scope.appointment.timeUserWants;
        var timedoctorhave= $scope.timings;
        var date=getdate(day);
        fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/fetchAndFillAppointmentInDatabase",{
            method: "POST", 
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({date,doctor:doctorname}) 
        }).then(data=>{
            data.json().then(data=>{
                availabletimingdata=data.data;
                console.log(availabletimingdata);
                
                var timingarr=data.data[0].Appointment.time.filter(e=>{
                    console.log("time",time,"time1",e.timing)
                    if(e.timing==time)
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                console.log("timing array",timingarr);
                for(i in timingarr[0].appointmentdetails)
                {
                    if(timingarr[0].appointmentdetails[i].booked==false)
                    {
                        if(i==0)
                        {
                            $scope.availabletimings.push(""+time+":"+0+""+0);
                        }
                        else if(i==1)
                        {
                            $scope.availabletimings.push(""+time+":"+15);
                        }
                        else if(i==2)
                        {
                            $scope.availabletimings.push(""+time+":"+30);
                        }
                        else if(i==3)
                        {
                            $scope.availabletimings.push(""+time+":"+45);
                        }
                    }
                }
                console.log($scope.availabletimings);
            })
            .catch(err=>{
                console.log(err)
            })
        })
    }
    //this function does the validations
    function validate(string)
    {   if(string=="patient")
        {
            console.log("hello");
            console.log($scope.patient);
            if($scope.patient.name&&$scope.patient.address&&$scope.patient.contact&&$scope.patient.mail&&$scope.patient.age&&$scope.patient.gender)
            {
                console.log("hello2");
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

                if($scope.patient.contact.length==10)
                {
                    if(reg.test($scope.patient.mail)==true)
                    {
                        $scope.filldetails=false;
                        return true;
                    }
                    else
                    {
                        $scope.filldetails=true;
                        return false;
                    }
                }
                else
                {
                    $scope.filldetails=true;
                    return false;
                }
            }
            $scope.filldetails=true;
            return false;    
        }
        else if(string == "doctor")
        {
            console.log($scope.doctor);
            console.log("will available from",doctor.willAvailableFrom);
            if($scope.doctor.willAvailableTo&&$scope.doctor.name&&$scope.doctor.gender&&$scope.doctor.mail&&$scope.doctor.willAvailableFrom&&$scope.doctor.contact&&$scope.doctor.domain)
            {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

                if($scope.doctor.contact.length==10)
                {
                    if(reg.test($scope.doctor.mail)==true)
                    {
                        $scope.filldetails=false;
                        return true;
                    }
                    else
                    {
                        $scope.filldetails=true;
                        return false;
                    }
                }
                else
                {
                    $scope.filldetails=true;
                    return false;
                }
            }
            $scope.filldetails=true;
            return false;
        }
    }
    //this function get doctors from the firebase and update them in array
    function getDoctors(){
        fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/getDoctors").then(data=>{
            data.json().then(data=>{
                console.log("data of the doctors",data);
                console.log(data);
                $scope.doctors=data.data;
                $scope.$apply();
                console.log("we get the data of doctors from the database");
            }).catch(err=>{
                console.log("cannot fetch the data due to the error",err);
            })
        })
    }
    //this function get patients from the firebase and update them in array
    function getPatients(){
        var getdate = document.querySelector("#setDate");
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
        console.log(`${today.getFullYear()}-${mm}-${dd}`);
        getdate.setAttribute("min",`${today.getFullYear()}-${mm}-${dd}`)
        fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/getPatients").then(data=>{
            console.log("this is the data",data);
            data.json().then(data=>{
                $scope.patients=data.data;
                $scope.$apply();
                console.log("we get the data of doctors from the database");
                console.log($scope.patients);
            }).catch(err=>{
                console.log(data.body.json().then(data=>{
                    console.log(data);
                }));
                console.log("cannot fetch the data due to the error",err);
            })
        })
    }
    //this function will book the appointments 
    $scope.bookAppointment=()=>{
        var Time = $scope.appointment.selectedTime;
        Time=Time.slice(-2);
        var Time = parseInt(Time);
        var index = Time/15;
        var today=$scope.appointment.date;
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        if(dd<10)
        {
            dd="0"+dd;
        }
        if(mm<10)
        {
            mm="0"+mm;
        }
        var date=`${today.getFullYear()}-${mm}-${dd}`;
        for(i of availabletimingdata[0].Appointment.time)
        {
            if(i.timing==$scope.appointment.selectedTime.slice(0,-3))
            {
                console.log(i.timing==$scope.appointment.selectedTime.slice(0,-3));
                console.log("timing",i.timing,"getting true");
                i.appointmentdetails[index].booked=true;
                i.appointmentdetails[index].bookedBy=$scope.appointment.patientname;
            }
        }
        console.log(availabletimingdata);
        fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/updateAppointments",{
            method: "POST", 
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(availabletimingdata) 
        }).then(data=>{
            alert("appointment is booked");
        })
        .catch(err=>{
            alert("appointment is not booked");
        })
   }
    //this function shows the appointment of a doctor on a particular day
    $scope.showAppointment=(a)=>{
        var obj={
            date:a,
            doctor:doctorName
        }
        console.log(obj);
        fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/fetchAndFillAppointmentInDatabase",{
            method: "POST", 
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(obj) 
        }).then(data=>{
            console.log(data);
            data.json().then(data=>{
                console.log("this is the data",data);
                var a = data.data[0].Appointment.time;
                var arr=[];
                console.log(a);
                for(item of a)
                {
                    var arr2=[];
                    var arr3=[];
                    arr2.push(item.timing);
                    for(i in item.appointmentdetails)
                    {
                        if(item.appointmentdetails[i].booked==true)
                        {
                            if(i==0)
                            {
                                arr3.push(item.timing+":00");
                            }
                            else if(i==1)
                            {
                                arr3.push(item.timing+":15");
                            }
                            else if(i==2)
                            {
                                arr3.push(item.timing+":30");
                            }
                            else if(i==3)
                            {
                                arr3.push(item.timing+":45")
                            }
                        }
                    }
                    arr2.push(arr3);
                    arr.push(arr2);
                }
                $scope.doctorsAppointment=arr;
                console.log(arr);
                $scope.$apply();
                var list = document.querySelectorAll('.time');
                console.log(list);
                    for(i of list)
                    {
                        i.addEventListener("click",function(){
                            if(this.querySelector('.hide').style.opacity==0)
                            {
                                this.querySelector("i").setAttribute("style","transform:rotate(135deg);text-align:right;float:right;")
                                this.querySelector(".hide").setAttribute("style","opacity:1;max-height: 300px;");
                            }
                            else
                            {
                                this.querySelector("i").setAttribute("style","transform:rotate(0deg);text-align:right;float:right;")
                                this.querySelector(".hide").setAttribute("style","opacity:0;max-height: 0;transition-duration:1s;")
                            }
                        })
                    }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    //this function assigns the doctor name to view appointments of the doctors
    $scope.assignDoctor=(name)=>
    {
        doctorName=name;
    }

})
