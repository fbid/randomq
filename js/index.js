(function () {
    angular.module('rndmq', [
        'ngRoute'
    ])
        .factory('Questions', ['$http', function ($http) {
            return {
                getAll: function () {
                    return $http.get('./api/test/test.json');
                }
            };
        }])
        .factory('Categories', ['$http', function ($http) {
            return {
                getAll: function () {
                    return $http.get('./api/question-categories.json');
                }
            };
        }])
        .controller('MainCtrl', ['Questions', 'Categories', function (Questions, Categories) {
            var q = this;
            q.selectedQuestion = {};
            q.questions = [];
            q.categories = [];
            q.showSolution = false;
            Questions.getAll()
                .then(function (response) {
                q.questions = response.data;
                q.getQ();
            });
            Categories.getAll()
                .then(function (response) {
                q.categories = response.data;
            });
            q.getQ = function () {
                q.showSolution = false;
                var index = Math.floor(Math.random() * q.questions.length);
                q.selectedQuestion = q.questions[index];
            };
        }]);
})();
