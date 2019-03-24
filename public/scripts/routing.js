app.config(($locationProvider,$routeProvider)=>{
$locationProvider.hashPrefix('');
$routeProvider.when('/',{ templateUrl:'../views/Calender.html',controller:"calenderpagecontroller"})
.when('/Records',{ templateUrl:'../views/Records.html'})
.when('/Inventory',{ templateUrl:'../views/Inventory.html',controller:"inventorycontroller"})
.when('/Expense',{ templateUrl:'../views/Expense.html'})
.when('/Analytics',{ templateUrl:'../views/Analytics.html',controller:"AnalyticsController"})
.when('/Store',{templateUrl:'../views/Store.html',controller:'storecontroller'})
.when('/Attendence',{templateUrl:"../views/Attendence.html",controller:"attendencecontroller"})
})