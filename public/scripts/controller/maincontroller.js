app.controller("maincontroller",($scope)=>{
    $scope.logout=()=>{
        console.log("hello");
        location.href="https://warm-cliffs-37108.herokuapp.com/logout";
    }

})