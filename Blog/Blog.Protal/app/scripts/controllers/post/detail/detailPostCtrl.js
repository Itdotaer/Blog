(function() {
    'use strict';

    angular
        .module('app')
        .controller('detailPostController', detailPostController);

    //Inject modules
    detailPostController.$inject = ['$cookies', '$state', '$stateParams', 'logger', 'postService', 'DEBUG'];

    function detailPostController($cookies, $state, $stateParams, logger, postService, DEBUG) {
        var vm = this;

        activate();

        function activate() {
            vm.post = {};
            var postId = $stateParams.postId;
            if (postId) {
                postService.getPostById(postId).then(function(post) {
                    vm.post = post;
                    if (DEBUG) {
                        console.log(vm.post);
                    }
                }, function(reason) {
                    logger.logError('Get post by id error.');
                });
            } else {
                logger.logError('No Post Id.');
                $state.go('index');
            }
        }
    }
})();