(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    //Inject modules
    mainController.$inject = ['postService', 'logger', 'DEBUG'];

    function mainController(postService, logger, DEBUG) {
        var vm = this;
        vm.deletePostById = deletePostById;

        activate();

        function activate() {
            vm.posts = [];

            postService.getAllPosts().then(function(data) {
                vm.posts = data;
                if (DEBUG) {
                    console.log(vm.posts);
                }
            }, function(reason) {
                logger.logError('Get all posts error.');
            });
        }

        function deletePostById(postId) {
            if (postId) {
                postService.deletePostById(postId).then(function(data) {
                    var idx = vm.posts.indexOf(postId);
                    if (idx) {
                        vm.posts.splice(idx, 1);
                    }
                }, function(reason) {
                    logger.logError('Delete post by id(id=' + postId + ') error.');
                });
            } else {
                logger.logError('No post id.');
            }
        }
    }
})();