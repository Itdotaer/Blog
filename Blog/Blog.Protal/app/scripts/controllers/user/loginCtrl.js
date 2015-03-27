(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    //Inject modules
    loginController.$inject = ['$cookies', '$state', 'logger', 'userService','DEBUG'];

    function loginController($cookies, $state, logger, userService,DEBUG) {
        var vm = this;
        vm.login = login; 

        activate();

        function activate() {
            vm.rememberedMeChecked = false;
            vm.userInfo = { email: '', password: '', rememberedMe: '' };

            var userInfo = $cookies.get('userInfo');
            if (userInfo) {
                vm.userInfo = JSON.parse(userInfo);
            }

            if (DEBUG) {
                logger.logInfo("Get remembered userInfo.");
            }
        }

        function login() {
            if (!vm.userInfo.email || !vm.userInfo.password) {
                logger.logError("Email or password is null.");
            } else {
                if (DEBUG) {
                    logger.logInfo("Go into request user login service.");
                }
                if (vm.userInfo.rememberedMe) {
                    $cookies.put('userInfo', angular.toJson(vm.userInfo));
                    if (DEBUG) {
                        logger.logInfo("Remembered");
                    }
                } else {
                    $cookies.remove('userInfo');
                    if (DEBUG) {
                        logger.logInfo("Remove user info.");
                    }
                }
                userService.login(vm.userInfo);
                $state.go('index');
            }
        }        
    }
})();