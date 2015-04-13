(function() {
    'use strict';

    angular
        .module('app')
        .controller('editPostController', editPostController);

    //Inject modules
    editPostController.$inject = ['$cookies', '$state', '$stateParams', 'logger', 'postService', 'DEBUG'];

    function editPostController($cookies, $state, $stateParams, logger, postService, DEBUG) {
        var vm = this;
        vm.updatePost = updatePost;
        vm.cancel = cancel;

        activate();

        function activate() {
            var loginUser = JSON.parse($cookies.get('loginUser'));
            if (loginUser) {
                var postId = $stateParams.postId;
                if (postId) {
                    postService.getPostById(postId).then(function (post) {
                        vm.post = post;
                        if (DEBUG) {
                            console.log(vm.post);
                        }
                    }, function (reason) {
                        logger.logError('Get post by id error.');
                    });
                } else {
                    logger.logError('No post id.');
                }
            } else {
                logger.logError("User should be login.");
                $state.go('login');
            }         
        }

        function updatePost() {
            var loginUser = JSON.parse($cookies.get('loginUser'));
            if (loginUser) {
                if (vm.post) {
                    postService.updatePost(loginUser, vm.post).then(function(data) {
                        logger.logSuccess('Updated successed.');
                        $state.go('detailPost', {postId: vm.post.Id});
                    }, function(reason) {
                        logger.logError('Update post(id=' + vm.post.Id + ') error.');
                    });
                } else {
                    logger.logError("Post is null.");
                }
            } else {
                logger.logError("User should be login.");
                $state.go('login');
            }         
        }

        function cancel(postId) {
            $state.go('detailPost', {postId: postId});
        }
    }
})();