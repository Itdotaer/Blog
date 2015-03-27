(function() {
    'use sctrict';

    var app = angular.module('app', ['ui.router', 'ngCookies', 'angular-md5', 'services']);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    routeChanged.$inject = ['$cookies', '$state', '$rootScope', '$location'];

    //Router
    app.config(router);
    app.run(routeChanged);    

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/app/views/main.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/app/views/about/about.html'
            })
            .state('post', {
                url: '/post',
                templateUrl: '/app/views/post/post.html',
                data: {
                    requireLogin: true
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/app/views/contact/contact.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/app/views/user/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout',
                controller: 'logoutController',
                controllerAs: 'vm'
        });
    }

    function routeChanged($cookies, $state, $rootScope, $location) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            var shouldLogin = toState.data !== undefined && toState.data.requireLogin;

            var loginUser = $cookies.get('loginUser');
            if (loginUser) {
                //User logined in
                $rootScope.isLoginedIn = true;
            } else {
                if (shouldLogin) {
                    $state.go('login');
                    e.preventDefault();
                }
                
                $rootScope.isLoginedIn = false;
            }

            return;   
        });
    }

//Constants
    app.constant("DEBUG", true);
})();