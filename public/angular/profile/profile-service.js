(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Profile', [
    '$http',
    function($http) {

      const fetchProfile = () => {
        return $http.get('/api/profile').then(res => res.data);
      };

      const editProfile = (user) => {
        return $http.put('/api/profile', user).then(res => res.data);
      };

      return {
        fetchProfile,
        editProfile
      };
    }
  ]);
})();
