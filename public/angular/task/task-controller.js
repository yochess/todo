(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('taskCtrl', [
    'Task',
    function(Task) {
      const vm = this;
      vm.tasks = [];
      vm.originalTasks = [];
      vm.newTask = {};
      vm.clicked = [];

      vm.toggleEdit = (index, bool) => {
        vm.clicked[index] = !vm.clicked[index];

        if (bool === undefined) {
          vm.originalTasks[index] = Object.assign({}, vm.tasks[index]);
        } else if (bool === false) {
          vm.tasks[index] = vm.originalTasks[index];
        } else {
          Task.editTask(vm.tasks[index]).catch(err => console.error(err));
        }
      };

      vm.fetchTasks = () => {
        Task.fetchTasks().then(data => {
          vm.tasks = data;
        })
      }

      vm.createTask = () => {
        Task.createTask(vm.newTask).then(data => {
          vm.fetchTasks();
        });
      };

      vm.deleteTask = (index) => {
        Task.deleteTask(vm.tasks[index]).then(data => {
          vm.originalTasks = [];
          vm.clicked = [];
          vm.fetchTasks();
        });
      };

      vm.fetchTasks();
    }
  ]);
})();
