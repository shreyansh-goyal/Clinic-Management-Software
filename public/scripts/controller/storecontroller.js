app.controller("storecontroller",function($scope,storefactory){
$scope.table=[];
$scope.select=[];
$scope.medicene={};
$scope.selectedmediceneinfo = {};
var obj={};
var previousMedicene=false;
getMedicenes();
//firebase independent
//adding the medicene data to the database
$scope.add=()=>{
    if(validate())
    {
        $scope.fillObject();
        if(previousMedicene==true)
        {
            var obj1=JSON.parse(JSON.stringify($scope.medicene));//cloning the object
            obj1.Pcost+=obj.Medicene.Pcost
            obj1.units+=obj.Medicene.units;
            var obj2={};
            obj2.name=obj1.name;
            obj2.Ccost=obj1.Ccost;
            obj2.discount=obj1.discount;
            obj2.gst=obj1.gst;
            fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/updateMedicene",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({toFind:obj2,toUpdate:obj1}) 
        }).then(data=>{
            alert("Updated in the record")
            getMedicenes();
        }).catch(err=>{
            alert("Unable to insert due to some error")
            console.log(err);
        })
        }
        else
        {
            $scope.medicene.user = 
            console.log("data needed to be stored",$scope.medicene);
            fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/addMedicene",
                {
                    method: "POST", 
                    mode: "cors",
                    cache: "no-cache", 
                    credentials: "same-origin", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrer: "no-referrer",
                    body: JSON.stringify($scope.medicene), 
            }).then(data=>{
                alert("inserted in the record");
                getMedicenes();
            }).catch(err=>{
                console.log(err);
                alert("unable to insert due to some error");
            })
        }

    }
}

//For validation of the empty form
function validate()
{
    if($scope.medicene.name&&$scope.medicene.Pcost&&$scope.medicene.Ccost&&$scope.medicene.units&&$scope.medicene.discount&&$scope.medicene.gst)
    {
        return true;
    }
    return false;
}
//Retrieve the data to fill in the select form
function getMedicenes(){
    fetch("https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/getMedicene").then(resolve=>{
        resolve.json().then(data=>{
            $scope.table=data.data;
            $scope.select=data.data
            $scope.$apply();
        }).catch(err=>{
            alert("Some error is occured while fetching the records");
        })
    })
    .catch(err=>{
        console.log(err);
    })
}
//Checks If the Entry Exsist And Update that
$scope.fillObject=()=>{

    console.log($scope.select);
    for(item of $scope.select)
    {
        if($scope.medicene.name==item.Medicene.name)
        {
            obj=item;
            previousMedicene = true; 
            if(previousMedicene)
            {
                $scope.medicene.discount=obj.Medicene.discount;
                $scope.medicene.Ccost=obj.Medicene.Ccost;
                $scope.medicene.gst=obj.Medicene.gst;
            }
            break;
        }
        else
        {
            previousMedicene=false;
        }
    }
}
})