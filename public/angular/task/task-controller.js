(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('taskCtrl', [
    'Task',
    function(Task) {
      const vm = this;
    }
  ]);
})();
