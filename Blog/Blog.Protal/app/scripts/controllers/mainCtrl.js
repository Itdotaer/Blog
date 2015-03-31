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
        vm.nextPage = nextPage;

        activate();

        function activate() {
            vm.posts = [];
            vm.pageIndex = 1;
            vm.pageSize = 10;

            postService.getPosts(vm.pageSize, vm.pageIndex).then(function (data) {
                vm.posts = data.posts;
                vm.totalSize = data.totalSize;
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

        function nextPage() {
            vm.pageIndex++;

            if (vm.pageIndex <= vm.totalSize) {
                vm.posts = [];

                postService.getPosts(vm.pageSize, vm.pageIndex).then(function(data) {
                    vm.posts = data.posts;
                    if (DEBUG) {
                        console.log(vm.posts);
                    }
                }, function(reason) {
                    logger.logError('Get all posts error.');
                });
            } else {
                logger.logError('PageIndex is the last.');
            }
        }
    }
})();