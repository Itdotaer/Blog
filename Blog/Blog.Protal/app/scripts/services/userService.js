(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$cookies', 'logger'];

    function userService($http, $cookies, logger) {
        var service = {
            login: login
        };

        function login(user) {
            if (user) {
                var returnUserInfo = angular.toJson({ UserId: 'xxx-xxxx-xxxx', userName: 'Harry Hu', email: 'hujiangtao1235@gmail.com' });
                $cookies.put('loginUser', returnUserInfo);
            } else {
                logger.logError("User is null.");
            }
        }

        return service;
    }
})();