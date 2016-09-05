(() => {
  'use strict';
  const app = angular.module('todo');

  app.service('Task', [
    '$http',
    function($http) {

      const fetchTasks = () => {
        return $http.get('/tasks')
          .then(res => res.data);
      };

      return {
        fetchTasks
      }
    }
  ]);
})();
