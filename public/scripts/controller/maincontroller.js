app.controller("maincontroller",($scope)=>{
    $scope.logout=()=>{
        console.log("hello");
        location.href="http://localhost:1234/logout";
    }

})