(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$cookies', 'logger', 'APIURL', 'DEBUG'];

    function userService($http, $cookies, logger, APIURL, DEBUG) {
        var service = {
            login: login
        };

        function login(user) {
            var postUser =
                {
                    Id: -1,
                    Email: user.email,
                    UserName: '',
                    Password: user.password,
                    CreatedDate: null,
                    CreatedBy: -1,
                    LastUpdatedDate: null,
                    LastUpdatedBy: -1,
                    IsDeleted: false
                };
            if (DEBUG) {
                console.log(postUser);
            }

            //Validate user info from backend database.
            return $http.post(APIURL + '/Users/Login', JSON.stringify(postUser), {
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json'
                }
            }).then(function (resp) {
                //if (resp.data) {
                //    $cookies.put('loginUser', JSON.stringify(resp.data));
                //}
                return resp.data;
            });
        }

        return service;
    }
})();