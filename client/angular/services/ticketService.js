//=======================================
// Ticket Service  ======================
//=======================================

myApp.service('ticketService',['$http', function($http){
    
//=======================================
// logout user function ==================
//=======================================   
    this.getTicket = function(){
        return $http.post('http://localhost:8000/ticket/createTicket');
    }

//=======================================
// get All ticket function ==============
//=======================================
     this.getAllTicket = function(){
        return $http.get('http://localhost:8000/ticket/all');
    }

//=======================================
// get single ticket function ===========
//=======================================
     this.getsingleTicket = function(ticketId){
         return $http.get('http://localhost:8000/ticket/'+ ticketId)
          };

//=======================================
// answer ticket function ===============
//=======================================
     this.answerTicket = function(ticketId, data){
         return $http.post('http://localhost:8000/ticket/'+ ticketId+"/answers", data)      
          };


//=======================================
// cloase ticket function ===============
//=======================================
    this.closeTicket = function(ticketId, data){
        return $http.put('http://localhost:8000/ticket/'+ ticketId, data)
         };
    

//=======================================
// sendmail function ====================
//=======================================
    this.sendMail = function( data){
        return $http.post('http://localhost:8000/ticket/contact', data)
         };

//=======================================
// sendMailStatus function ====================
//=======================================
    this.sendMailStatus = function( data){
        return $http.post('http://localhost:8000/ticket/status', data)
         };


}])