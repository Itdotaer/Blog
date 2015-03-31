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
            //Post detail
            .state('detailPost', {
                url: '/post/detail/:postId',
                templateUrl: '/app/views/post/detail/detailPost.html',
                controller: 'detailPostController',
                controllerAs: 'vm',
            })
            //Add one post
            .state('addPost', {
                url: '/post/add',
                templateUrl: '/app/views/post/add/addPost.html',
                controller: 'addPostController',
                controllerAs: 'vm',
                data: {
                    requireLogin: true
                }
            })
            //Edit one post
            .state('editPost', {
                url: '/post/edit/:postId',
                templateUrl: '/app/views/post/edit/editPost.html',
                controller: 'editPostController',
                controllerAs: 'vm',
                data: {
                    requireLogin: true
                }
            })
            //Send mail
            .state('contact', {
                url: '/contact',
                templateUrl: '/app/views/contact/contact.html',
                controller: 'sendMailController',
                controllerAs: 'vm'
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
                $rootScope.isLoginedIn = false;
            }

            if (shouldLogin === true) {
                if (!loginUser) {
                    $state.go('login');
                    e.preventDefault();

                    $rootScope.isLoginedIn = false;
                }
            }

            return;   
        });
    }

    //Constants
    app.constant('DEBUG', true);
    app.constant('APIURL', 'http://localhost:23751/api');
})();