(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Task', [
    '$http',
    function($http) {
      const fetchTasks = () => {
        return $http.get('/api/task').then(res => res.data);
      };

      const createTask = (task) => {
        return $http.post('/api/task', task).then(res => res.data);
      };

      const editTask = (newTask) => {
        return $http.put(`/api/task/${newTask.id}`, newTask).then(res => res.data);
      }

      return {
        fetchTasks,
        createTask,
        editTask
      };
    }
  ]);
})();
