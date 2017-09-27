//======================================
// Define a loginController ============
//======================================
myApp.controller('loginController',['$http','$window','$location','authentication', function($http,$window,$location,authentication){

    var main = this;
  
//======================================
// Function to login user ==============
//======================================    
main.loginUser = function(){
    var myData = {
            email : main.email,
            password:main.password
        }
     authentication.login(myData)        
          .then(function sucess(response){
                 $window.location.href = '#/dashboard';
               },function error(response){
                     alert("some error occurred. Check the console.");
                     console.log(response)
               });
     };


}])