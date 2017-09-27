//======================================
// Define a dashboarrdController =======
//======================================
myApp.controller('dashboardController',['$http','$window','$location','validateToken','authentication','ticketService', function($http,$window,$location,validateToken,authentication, ticketService){
    
    var main = this;

//======================================
// Function to load all tickets ========
//======================================
 main.loadAllTicket = function(){
        main.arrFromMyObj 
        ticketService.getAllTicket()
            .then(function sucess(data){
                  main.ticket = data.data
                  main.arrFromMyObj = Object.keys(main.ticket)
                  .map(function(key) {return main.ticket[key];});
                 },function error(response){
                       alert("some error occurred. Check the console.");
                       console.log(response)
                 });
    };


//======================================
// Function to load User ===============
//======================================
 main.loadUser = function(){
        main.user = {}
        validateToken.getProfile()
            .then(function sucess(data){
                main.user = data.data;
            }, function error(response){
                    alert("some error occurred. Check the console.");
                    console.log(response)
             });             
    };


//======================================
// Function to logout user ===============
//======================================
main.logoutUser = function(){
    authentication.logout()
}

}])