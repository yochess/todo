(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Profile', [
    '$http',
    function($http) {

      const fetchUsers = () => {
        return $http.get('/api/user').then(res => res.data);
      };

      const fetchUser = (id) => {
        return $http.get(`/api/user/${id}`).then(res => res.data);
      };

      const fetchProfile = () => {
        return $http.get('/api/profile').then(res => res.data);
      };

      const editProfile = (user) => {
        return $http.put('/api/profile', user).then(res => res.data);
      };

      return {
        fetchUsers,
        fetchUser,
        fetchProfile,
        editProfile
      };
    }
  ]);
})();
