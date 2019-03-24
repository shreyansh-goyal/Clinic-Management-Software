app.controller("attendencecontroller",function($scope){
    $scope.employee={};
    $scope.attendence=[{name:"shreyansh",present:false},{name:"priyanka",present:false},{name:"mamta",present:false},{name:"deepak",present:false}];
    fetchEmployees();
    function disablethebutton(index)
    {
        var a = document.querySelectorAll('.attendence>tbody>tr>td>button');
        $scope.attendence[index].present=true;
        $scope.attendence[index].timestamp=new Date();
        console.log($scope.attendence[index])
        a[index].disabled=$scope.attendence[index].present;
    }
    $scope.markattendence=(item)=>{
        for(i in $scope.attendence)
        {
            if($scope.attendence[i].name==item.name)
            {
                disablethebutton(i);
            }
        }
    }
    $scope.uploadattendence=()=>
    {
            fetch("https://warm-cliffs-37108.herokuapp.com/uploadattendence",{
            method: "POST", 
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body:(angular.toJson($scope.attendence)) 
        }).then(data=>{
            if(data.ok)
            {
                data.json().then(data=>{
                    console.log("hello i am shreyansh goyal");
                    console.log(data); 
                    alert("Today's attendence is uploaded");
                })               
            }
            else
            {
                alert("There is some error,may b you are uploading the data twice same day");
            }
        }).catch(err=>{
            console.log("following error is occured",err);
        })
    }
    function fetchEmployees()
    {
        $scope.attendence=[];
        fetch("https://warm-cliffs-37108.herokuapp.com/fetchemployee").then(data=>{
            data.json().then(data=>{
                $scope.attendence = data.data;
                console.log($scope.attendence); 
                $scope.$apply();       
            })
            .catch(err=>{
                console.log("error is error",err);
            })
    })
    }
    $scope.addemployee=()=>
    {
        console.log($scope.employee);
        console.log("employee in process");
        fetch("https://warm-cliffs-37108.herokuapp.com/addemployee",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify($scope.employee) 
        }).then(data=>{
            alert("employee is added");
            fetchEmployees();
        }).catch(err=>{
            alert("employee is not added");
        })        
    }
})