( function() {

  angular.module('rndmq',[
    'ngRoute'
  ])

    // .config(['$routeProvider',
    // function($routeProvider) {
    //   $routeProvider
    //     .otherwise({
    //       redirectTo: '/'
    //     });
    // }])

    .factory('Questions',['$http', function($http){
      return {
        getAll: function() {
          return $http.get('./api/test/test.json');
        }
      }
    }])

    .factory('Categories',['$http', function($http){
      return {
        getAll: function() {
          return $http.get('./api/question-categories.json');
        }
      }
    }])

    .controller('MainCtrl',['Questions','Categories', function(Questions, Categories) {

      var q = this;

      q.selectedQuestion = {};
      q.questions = [];
      q.categories = [];
      q.showSolution = false;

      //Fetch Questions
      Questions.getAll()
        .then( (response):void => {
          q.questions = response.data;
          q.getQ();
      });

      //Fetch Categories
      Categories.getAll()
        .then( (response):void => {
          q.categories = response.data;
        });

      //Generate random question
      q.getQ = ():void => {
        q.showSolution = false; //reset
        var index = Math.floor(Math.random() * q.questions.length);
        q.selectedQuestion = q.questions[index];
      };


    }]);

})();
