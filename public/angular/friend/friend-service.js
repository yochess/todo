(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Friend', ['$http', function($http) {

    const fetchFriends = () => {
      return $http.get('/api/friend').then(res => res.data);
    };

    const checkFriend = (id) => {
      return $http.get(`/api/friend/${id}`).then(res => res.data);
    };

    const makeRequest = (id) => {
      return $http.post(`/api/friend/request/${id}`).then(res => res.data);
    };

    const fetchAwaitingFriends = () => {
      return $http.get('/api/friend/awaiting').then(res => res.data);
    };

    const makeResponse = (id, status) => {
      return $http.put(`/api/friend/awaiting/${id}`, status).then(res => res.data);
    };

    return {
      fetchFriends,
      checkFriend,
      makeRequest,
      fetchAwaitingFriends,
      makeResponse
    };
  }]);
})();
