myApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
        var onlyLoggedIn = function($location, $q, authentication) {
        var deferred = $q.defer();
        if (authentication.isLoggedIn()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url('/');
        }
        return deferred.promise;
    };

    $routeProvider
        .when('/',{
            templateUrl : 'views/login.html',
            controller : 'loginController',
            controllerAs : 'logUser'

        })
        .when('/signup',{
            templateUrl:'views/signup.html',
            controller : 'signupController',
            controllerAs:'signup'

        })
        .when('/dashboard',{
            templateUrl:'views/dashboard.html',
            controller : 'dashboardController',
            controllerAs: 'allTicket',
            resolve:{loggedIn:onlyLoggedIn}

        })
        .when('/create-ticket',{
            templateUrl:'views/createTicket.html',
            controller : 'ticketController',
            controllerAs: 'cTicket',
            resolve:{loggedIn:onlyLoggedIn}

        })
        .when('/my-ticket',{
            templateUrl:'views/myTicket.html',
            controller : 'ticketController',
            controllerAs: 'cTicket',
            resolve:{loggedIn:onlyLoggedIn}

        })
        .when('/my-ticket/:ticketId',{
            templateUrl:'views/myTicketDetails.html',
            controller : 'ticketController',
            controllerAs: 'cTicketDetails',
            resolve:{loggedIn:onlyLoggedIn}

        })
        .otherwise(
            { template : '<h2>Page not Found</h2>'}
        )
        // $locationProvider.html5Mode(true);

}])
