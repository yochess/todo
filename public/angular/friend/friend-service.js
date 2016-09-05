(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Friend', ['$http', function($http) {

    const fetchFriends = () => {
      return $http.get('/api/friend').then(res => res.data);
    };

    return {
      fetchFriends
    };
  }]);
})();
