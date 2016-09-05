(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('taskCtrl', [
    'Task',
    '$state',
    function(Task, $state) {
      const vm = this;
      vm.tasks = [];
      vm.originalTasks = [];
      vm.clicked = [];
      vm.newTask = {};

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

      vm.fetchTasks = (index) => {
        Task.fetchTasks().then(data => {
          vm.tasks = data;

          if (index !== undefined) {
            vm.originalTasks.splice(index,1);
            vm.clicked.splice(index,1);
          }
        })
      }

      vm.createTask = () => {
        Task.createTask(vm.newTask).then(data => {
          vm.fetchTasks();
          vm.newTask = {};
        });
      };

      vm.deleteTask = (index) => {
        Task.deleteTask(vm.tasks[index]).then(data => {
          vm.fetchTasks(index);
        });
      };

      vm.fetchTasks();
    }
  ]);
})();
