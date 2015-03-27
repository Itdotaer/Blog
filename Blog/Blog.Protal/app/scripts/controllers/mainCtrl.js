(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    //Inject modules
    mainController.$inject = ['logger'];

    function mainController() {
        
    }
})();