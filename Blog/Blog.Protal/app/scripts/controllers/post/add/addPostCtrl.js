(function() {
    'use strict';

    angular
        .module('app')
        .controller('addPostController', addPostController);

    //Inject modules
    addPostController.$inject = ['$cookies', '$state', 'logger', 'postService', 'DEBUG'];

    function addPostController($cookies, $state, logger, postService, DEBUG) {
        var vm = this;
        vm.addPost = addPost;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.post = { title: '', description: '', content: '' };
        }

        function addPost() {
            var loginUser = JSON.parse($cookies.get('loginUser'));
            if (loginUser) {
                postService.addPost(loginUser, vm.post).then(function(post) {
                    if (post) {
                        if (DEBUG) {
                            console.log(post);
                        }
                        $state.go('detailPost', { postId: post.Id });
                    }
                }, function(reason) {
                    logger.logError('Add one post error.');
                });
            } else {
                logger.logError('User should be login.');
                $state.go('login');
            }
        }

        function cancel() {
            $state.go('index');
        }
    }
})();