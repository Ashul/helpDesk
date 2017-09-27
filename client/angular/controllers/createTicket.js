//======================================
// Define a ticketController ===========
//======================================
myApp.controller('ticketController',['$http','$window','$location','$routeParams', 'ticketService','validateToken', function($http,$window,$location,$routeParams, ticketService,validateToken){
    var main = this;
    main.user = {}    
    // main.init = function(){
    // main.getUser();
    // }


//======================================
// Function to load user ===============
//======================================
main.getUser = function(){
    //use validateToken service
    validateToken.getProfile()
        .then(function sucess(data){
            main.user = data.data;
            //load my ticket function
            main.loadmyTicket();
            }, function error(response){
            alert("some error occurred. Check the console.");
            console.log(response)
        })
};

//======================================
// Function to close ticket ============
//======================================
main.cTicket = function(){
    var myData = {
        Qstatus:'closed'
        }
    main.ticketId = $routeParams.ticketId;
    ticketService.closeTicket(main.ticketId, myData)
            .then(function sucess(response){
                main.sendMailforstatuschange();
                $window.location.href = '#/dashboard';
                 },function error(response){
                     alert("some error occurred. Check the console.");
                     console.log(response)
                    })
    };


//======================================
// Function to create ticket ============
//======================================
 main.createTicket = function(){
     var myData = {
            firstName: main.user.firstName,
            lastName : main.user.lastName,
            email    : main.user.email,
            mobile   : main.user.mobile,
            question : main.question,
            Qdetails : main.Qdetails
        }
    validateToken.getTicket(myData)
            .then(function sucess(response){
                $window.location.href = '#/dashboard';
            },function error(response){
                alert("some error occurred. Check the console.");
                console.log(response)
            })
    }


//======================================
// Function to load my ticket ==========
//======================================
 main.loadmyTicket = function(){
    var myData = {email : main.user.email}
    main.myTicket = {};
    validateToken.getmyTicket(myData)
            .then(function sucess(response){
                angular.forEach(response, function(){
                    main.myTicket = response.data
                    });
            },function error(response){
                alert("some error occurred. Check the console.");
                console.log(response)
                });    
    };


//======================================
// Function to load single ticket ======
//======================================
 main.loadsingleTicket = function(){
    main.mysingleTicket = {};
    main.ticketId = $routeParams.ticketId;
    ticketService.getsingleTicket(main.ticketId)
       .then(function sucess(response){
            main.mysingleTicket = response.data
        },function error(response){
                alert("some error occurred. Check the console.");
                console.log(response)
            });    
    };


//======================================
// Function to Get User Answer =========
//======================================
main.getUserAnswer = function(){
    validateToken.getProfile()
        .then(function sucess(data){
            main.user = data.data;
            main.sendMails();
            main.myAnswer();
            }, function error(response){
                alert("some error occurred getUserAnswer. Check the console.");
                console.log(response)
            });
    };
//======================================
// Function to Get Answer ==============
//======================================
main.myAnswer = function(){
    var myData = {
        answer: main.answer,
        firstName: main.user.firstName,
        lastName : main.user.lastName,
        email    : main.user.email,
        mobile   : main.user.mobile,
    };
    main.ticketId = $routeParams.ticketId;    
    ticketService.answerTicket(main.ticketId, myData)
        .then(function sucess(response){
             $window.location.reload();
            },function error(response){
                alert("some error occurred myAnswer. Check the console.");
                console.log(response)
            });
    };


//======================================
// Function to send Mail for answer ====
//======================================
main.sendMails = function(){
     main.ticketId = $routeParams.ticketId;
     ticketService.getsingleTicket(main.ticketId)
            .then(function sucess(response){
                 angular.forEach(response.data, function(result){
                 var mail = result.email
                 JSON.stringify(mail); 
                 main.mymsg = mail 
                 });                  
                 ticketService.sendMail({email:main.mymsg})
                    .then(function sucess(response){
                        console.log('sucess')
                    },function error(response){
                         console.log(response)
                 });
            },function error(response){
                alert("some error occurred in send mails. Check the console.");
                console.log(response)
            })               
    };

//======================================
// send Mail for status change =========
//======================================

    main.sendMailforstatuschange = function(){
     main.ticketId = $routeParams.ticketId;
     ticketService.getsingleTicket(main.ticketId)
            .then(function sucess(response){
                 angular.forEach(response.data, function(result){
                 var mail = result.email
                 JSON.stringify(mail); 
                 main.mymsg = mail 
                 });                  
                 ticketService.sendMailStatus({email:main.mymsg})
                    .then(function sucess(response){
                        console.log('sucess')
                    },function error(response){
                         console.log(response)
                 });
            },function error(response){
                alert("some error occurred in send mails. Check the console.");
                console.log(response)
            })               
    };


}]);
