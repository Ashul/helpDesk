//=======================================
// validateToken service ==================
//=======================================
myApp.service('validateToken',['$http','authentication', function($http, authentication){
    
//=======================================
// getProfile function ==================
//=======================================
 var getProfile = function(){
        return $http.get('/user/me', {
            headers:{
                Authorization:'Bearer '+ authentication.getToken()
            }
        })
    };
//=======================================
// getTicket function ==================
//=======================================
var getTicket = function(user){
              return $http.post('/ticket/createTicket', user).success(function(data){
      });
    };

       
//=======================================
// getmyTicket function ==================
//=======================================
var getmyTicket = function(user){
        return $http.post('/ticket/myTicket', user)
        
    
         }

    
    return{
        getProfile : getProfile,
        getTicket  : getTicket,
        getmyTicket: getmyTicket
    }
}])