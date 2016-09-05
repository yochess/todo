(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Task', [
    '$http',
    function($http) {
      const fetchTasks = () => {
        return $http.get('/api/task').then(res => res.data);
      };

      const createTask = (newTask) => {
        return $http.post('/api/task', newTask).then(res => res.data);
      };

      const editTask = (task) => {
        return $http.put(`/api/task/${task.id}`, task).then(res => res.data);
      };

      const deleteTask = (task) => {
        return $http.delete(`/api/task/${task.id}`, task).then(res => res.data);
      };

      return {
        fetchTasks,
        createTask,
        editTask,
        deleteTask
      };
    }
  ]);
})();
