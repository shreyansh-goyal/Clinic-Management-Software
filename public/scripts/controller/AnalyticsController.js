app.controller("AnalyticsController",function($scope){
    var medicenename=[];
    var mediceneunits=[];
    var employeename=[];
    var employeeAttendence=[];
    var a =document.querySelector("#carousel");
    var left =document.querySelector("#left");
    right.addEventListener('click',()=>{
        var a =document.querySelector("#carousel");
        if(a.style.left=='0%')
        {
            a.setAttribute("style","width:200%;display:flex;height:600px;position:absolute;animation:mymove 1s;animation-fill-mode: forwards;");
            a.style.left="-100%";
        }
        else
        {
            console.log(a.style.left);
            console.log("hello world");
        }
    })
    left.addEventListener('click',()=>{
        if(a.style.left=='-100%')
        {
            a.setAttribute("style","width:200%;display:flex;height:600px;position:absolute;animation:mymove1 1s;");
            a.style.left="0%";
        }
        else
        {
            console.log(a.style.left);
            console.log("hello world");
        }
    })
    var left =document.querySelector("#right");
    //animation:mymove 1s;
    fetch("https://warm-cliffs-37108.herokuapp.com/getAttendenceReport").then(data=>{
        data.json().then(data=>{
            console.log(data.data);
            for(i of data.data.persondata)
            {
                employeename.push(i.name);
                employeeAttendence.push(i.totalPresent);
            }
            var ctx = document.getElementById("myChart2");
            ctx.height=90;
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: employeename,
                    datasets: [{
                        label: 'Attendence',
                        data: employeeAttendence,
                        backgroundColor:'rgba(255, 99, 132, 0.2)',
                        borderColor:'rgba(255,99,132,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        })
        .catch(err=>{
            console.log("some error is occured",err);
        })
    })
    fetch("https://warm-cliffs-37108.herokuapp.com/getMediceneSaleRecord").then(data=>{
        data.json().then(data=>{
            for(item of data)
            {
                console.log(item);
                medicenename.push(item.MediceneConsumed.name);
                mediceneunits.push(item.MediceneConsumed.unitsConsumed);
            }
            console.log(medicenename);
            console.log(mediceneunits);
            var ctx = document.getElementById("myChart");
            ctx.height=90;
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: medicenename,
                    datasets: [{
                        label: 'Number of units Consumed',
                        data: mediceneunits,
                        backgroundColor:'rgba(255, 99, 132, 0.2)',
                        borderColor:'rgba(255,99,132,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        })
    }).catch(err=>{
        alert("Unable to fetch the data");
    })
})
