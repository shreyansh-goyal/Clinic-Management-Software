app.controller("maincontroller",($scope)=>{
    $scope.logout=()=>{
        console.log("hello");
        location.href="https://ec2-13-232-8-74.ap-south-1.compute.amazonaws.com:1234/logout";
    }

})