(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('User', [
    '$http',
    function($http) {

      const fetchUsers = () => {
        return $http.get('/api/user').then(res => res.data);
      };

      const fetchUser = (id) => {
        return $http.get(`/api/user/${id}`).then(res => res.data);
      };

      return {
        fetchUsers,
        fetchUser
      };
    }
  ]);
})();
