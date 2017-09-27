//=======================================
// create a authentication service ======
//=======================================
myApp.service('authentication',['$http','$window', function($http, $window){
    
//=======================================
// Save token function ==================
//=======================================
var saveToken = function(token){
        $window.localStorage['myApp-token'] = token;
    };


//=======================================
// get token function ===================
//=======================================
var getToken = function(token){
       return $window.localStorage['myApp-token'];
    }
   
//=======================================
// isLoggedIn function ===================
//=======================================
     var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

//=======================================
// current user function ================
//=======================================
    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
};

//=======================================
// register user function ===============
//=======================================
 register = function(user) {
      return $http.post('/user/signup', user).success(function(data){
        saveToken(data.token);
      });
    };


//=======================================
// login user function ==================
//=======================================
 login = function(user) {
      return $http.post('/user/login', user).success(function(data) {
        saveToken(data.token);
      });
   };

//=======================================
// logout user function =================
//=======================================
 logout = function(){
       $window.localStorage.removeItem('myApp-token')
       $window.location.href = '/';
    };
  
    return{
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    }
}])