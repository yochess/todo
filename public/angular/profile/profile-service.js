(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Profile', [
    '$http',
    function($http) {

      const fetchUsers = () => {
        return $http.get('/api/profile/users').then(res => res.data);
      };

      const fetchFriends = () => {
        return $http.get('/api/profile/friends').then(res => res.data);
      };

      const fetchMe = () => {
        return $http.get('/api/profile').then(res => res.data);
      };

      const fetchProfile = (id) => {
        return $http.get(`/api/profile/${id}`).then(res => res.data);
      };

      return {
        fetchUsers,
        fetchFriends,
        fetchMe,
        fetchProfile
      };
    }
  ]);
})();
