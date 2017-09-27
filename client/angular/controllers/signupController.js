//======================================
// Define a signupController ============
//======================================
myApp.controller('signupController', ['$http','$window','$location','authentication', function($http,$window,$location,authentication){
    
    //set the context
    var main = this;

//======================================
// function to signup user ============
//======================================
    main.signupUser = function(){
        var myData = {
          firstName : main.firstName,
          lastName  : main.lastName,
          email     : main.email,
          mobile    : main.mobile,
          password  : main.password
         };
      authentication.register(myData)      
           .then(function sucess(response){
                 $window.location.href = '/';
                },function error(response){
                      alert("some error occurred. Check the console.");
                      console.log(response)
               });
    };


}])