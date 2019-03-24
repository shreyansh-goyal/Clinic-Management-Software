app.controller("inventorycontroller",function($scope,storefactory){
    $scope.mediceneList=[];
    $scope.billArray=[];
    var updateArray=[];
    $scope.totalAmount=0;
    var error;
    UpdateAddMedicene();
    //This method update the add medicene collumn
    function UpdateAddMedicene(){
        $scope.mediceneList=[];
        fetch("https://warm-cliffs-37108.herokuapp.com/getMedicene").then(resolve=>{
            resolve.json().then(data=>{
                console.log(data);
                $scope.mediceneList = data.data;
                $scope.$apply();
            }).catch(err=>{
                error=err;
                console.log(err);
                alert("Some error is occured while fetching the records");
            })
        })
        .catch(err=>{
            console.log(err);
        })
        // console.log($scope.mediceneList);
        // var reference = storefactory.getMediceneList();
        // reference.once('value',(data)=>{
        //     console.log("data value",data.val());
        //     for(item in data.val())
        //     {
        //         $scope.mediceneList.push(data.val()[item]);
        //         $scope.$apply();
        //     }
        //     console.log($scope.mediceneList);
        //     $scope.$apply();
        //     console.log("final medicene list",$scope.mediceneList);
        // })
    }
    //This is the function to add the medicene to the bill
     $scope.addToBill=(mediceneObj)=>{
        var obj={};
         fetch(`https://warm-cliffs-37108.herokuapp.com/getunits?name=${mediceneObj.Medicene.name}`).then(data=>{
            data.json().then(data=>{
                obj.min=data[0].Medicene.units;
                if(checkInBill(obj))
                { 
                    $scope.billArray.push(obj);
                    $scope.$apply()
                }
                else
                {
                    ;
                }
            }).catch(err=>{
                console.log("hello I am in error",err);
            })
            obj.name=mediceneObj.Medicene.name;
            obj.cost=mediceneObj.Medicene.Ccost;
            obj.discount=mediceneObj.Medicene.discount;
            obj.gst=mediceneObj.Medicene.gst;
            obj.unit=0;
        })
    }
    //This function checks whether the data is already in the bill
    function checkInBill(obj){
        for(item of $scope.billArray)
        {
            if(item.name==obj.name)
            return false;
        }
        return true;
    }
    //This function generate the bill in pdf format
    $scope.generateInvoice=()=>{
        fetch("https://warm-cliffs-37108.herokuapp.com/checkUnits");
        console.log($scope.billArray);
            var medicenearr=[];
            for(medicene of $scope.billArray)
            {
                var obj={};
                obj.name=medicene.name;
                obj.units=medicene.unit;
                medicenearr.push(obj);
            }
            console.log("this is medicene array",medicenearr);
            fetch("https://warm-cliffs-37108.herokuapp.com/updateMedcieneUnits",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(medicenearr)
            }).then(data=>{
                alert("Units are Updated")
            })
            .catch(err=>{
                alert("Unable to update the units");
            })
            var doc = new jsPDF();
            var i = 0;
            doc.text("S.No",5,30);
            doc.text("Medicene Name",20,30);
            doc.text("Cost",80,30);
            doc.text("Discount",97,30);
            doc.text("GST",130,30);
            doc.text("Amount",160,30);
            
            for(item of $scope.billArray)
            {   var a= 15-item.name.length;
                doc.text($scope.billArray.indexOf(item)+'',10,40+i*9);
                doc.text(item.name,20,40+i*9);
                doc.text(item.cost+"",80,40+i*9);
                doc.text(item.discount+"%",100,40+i*9);
                doc.text(item.gst+"%",130,40+i*9);
                doc.text((item.cost*item.unit+item.cost*item.gst*0.01*item.unit)+"Rs",160,40+i*9);
                i++;
            }
        doc.text("Total Amount :"+$scope.totalAmount,150,40+i*9);            
        doc.save("something.pdf");
        updateUnits();
    }

    //this function updates the total amount for the bill
        $scope.updateTotalAmount=(item)=>{
        $scope.totalAmount=0;
        console.log(item);
        if(item.unit>item.min)
        {
            alert("We are not left with that amount of units");
        }
        for(item of $scope.billArray)
        {
            $scope.totalAmount+=(item.cost*0.01*item.gst+item.cost-item.cost*0.01*item.discount)*item.unit;
        }
    }
    //this function will be updating the database with the number of units
    function updateUnits(){
        updateArray=[];
        for(item of $scope.billArray)
        {
            for(medicene of $scope.mediceneList)
            {
                    if(medicene.Medicene.name==item.name)
                    {
                        if(medicene.Medicene.units-item.units>0)
                        {
                            medicene.Medicene.units-=item.unit;
                            updateArray.push(medicene);    
                        }
                        else
                        {
                            alert("Sorry can't Update as no more units are available");
                        }
                    }
            }
        }
        console.log("hello this is update array",updateArray);
        for(item of updateArray)
        {
            var obj1 ={};
            var obj2={};
            obj1.name = item.Medicene.name;
            obj2.units=item.Medicene.units;
            console.log("obj1",obj1,"Obj2",obj2);
            fetch("https://warm-cliffs-37108.herokuapp.com/updateMedicene",{
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({toFind:obj1,toUpdate:obj2}) 
                }).then(data=>{
                    console.log("updated units")
                }).catch(err=>{
                    console.log("failed to update the units");
                })
        }
    }

})