(function() {
    'use strict';

    angular
        .module('app')
        .controller('sendMailController', sendMailController);

    //Inject modules
    sendMailController.$inject = ['$state', 'logger', 'mailService', 'DEBUG'];

    function sendMailController($state, logger, mailService, DEBUG) {
        var vm = this;
        vm.sendMail = sendMail;

        activate();

        function activate() {
            vm.mail = { Name: '', EmailAddress: '', PhoneNumber: '', Message: '' };
        }

        function sendMail() {
            mailService.sendMail(vm.mail).then(function(data) {
                if (data && data.result === 'ok') {
                    logger.logSuccess(data.data);
                    $state.go('index');
                } else {
                    logger.logError(data.data);
                }
            }, function(reson) {
                logger.logError('Send mail error.');
            });
        }
    }
})();