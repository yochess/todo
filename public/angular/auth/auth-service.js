(() => {
  'use strict';
  const app = angular.module('todo');

  app.factory('Auth', [
    '$http',
    '$q',
    '$window',
    '$state',
    function($http, $q, $window, $state) {
      let loggedIn;
      let refreshed = true;

      if ($window.sessionStorage['loggedIn']) {
        loggedIn = JSON.parse($window.sessionStorage['loggedIn']);
      } else {
        loggedIn = false;
      }

      const isAuthSync = () => {
        if (refreshed) {
          isAuthAsync().then(data => {
            loggedIn = true;
            $window.sessionStorage['loggedIn'] = loggedIn;
            $state.reload();
          })
          .catch(err => {
            loggedIn = false;
            $window.sessionStorage['loggedIn'] = loggedIn;
            $state.reload();
          });
          refreshed = false;
        }
        return loggedIn;
      };

      const isAuthAsync = () => {
        const deferred = $q.defer();

        $http.get('/auth/isAuth').then(res => {
          if (res.data !== 'User is Authenticated!') {
            loggedIn = false;
            $window.sessionStorage['loggedIn'] = loggedIn;
            deferred.reject(res.data);
          }
          loggedIn = true;
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.resolve(res.data);
        })
        .catch(res => {
          loggedIn = false;
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.reject(res.data);
        });

        return deferred.promise;
      }

      const login = (user) => {
        const deferred = $q.defer();

        $http.post('/auth/login', user).then(res => {
          loggedIn = true;
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.resolve(res.data);
        })
        .catch(res => {
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.reject(res.data);
        });

        return deferred.promise;
      };

      const signup = (user) => {
        const deferred = $q.defer();

        $http.post('/auth/signup', user).then(res => {
          loggedIn = true;
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.resolve(res.data);
        })
        .catch(res => {
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.reject(res.data);
        });

        return deferred.promise;
      }

      const logout = () => {
        const deferred = $q.defer();

        $http.get('/auth/logout').then(res => {
          loggedIn = false;
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.resolve(res.data);
        })
        .catch(res => {
          $window.sessionStorage['loggedIn'] = loggedIn;
          deferred.reject(res.data);
        })

        return deferred.promise;
      }

      return {
        isAuthSync,
        login,
        signup,
        logout,
        isAuthAsync
      };
    }
  ]);
})();
