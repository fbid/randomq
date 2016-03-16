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
          return $http.get('./api/sql/queries.json');
        }
      }
    }])
    
    .controller('MainCtrl',['Questions', function(Questions) {

      var q = this;

      q.selectedQuestion = {};
      q.questions = [];
      q.showSolution = false;


      Questions.getAll()
        .then(function(response){
          q.questions = response.data;
          q.getQ();
      });


      q.getQ = () => {
        //q.showSolution = false; //reset
        var index = Math.floor(Math.random() * q.questions.length);
        q.selectedQuestion = q.questions[index];
      };


    }]);

})();
