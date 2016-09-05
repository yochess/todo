(() => {
  'use strict';
  const app = angular.module('todo', [
    'ui.router'
  ]);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('home');

      $stateProvider
        .state('root', {
          abstract: true,
          templateUrl: './root.html',
        })
        .state('home', {
          url: '/home',
          parent: 'root',
          templateUrl: './home/home.html'
        })
        .state('login', {
          url: '/login',
          parent: 'root',
          templateUrl: './auth/login.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('logout', {
          parent: 'root',
          url: '/logout',
          resolve: {
            logout: ['$state', 'Auth', function($state, Auth) {
              Auth.logout().then(data => {
                $state.go('login', {}, {reload: true});
              });
            }]
          }
        })
        .state('signup', {
          url: '/signup',
          parent: 'root',
          templateUrl: './auth/signup.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('todo', {
          url: '/todo',
          parent: 'root',
          templateUrl: './task/task.html',
          controller: 'taskCtrl',
          controllerAs: 'vm',
          resolve: {
            auth: ['Auth', '$state', '$timeout', function(Auth, $state, $timeout) {
              if (!Auth.isAuthSync()) {
                $timeout(() => { $state.go('login') });
              }
            }]
          }
        })
        .state('profile', {
          url: '/profile',
          parent: 'root',
          templateUrl: './profile/profile.html',
          controller: 'profileCtrl',
          controllerAs: 'vm'
        })
        .state('user', {
          url: '/:id',
          parent: 'profile',
          templateUrl: './profile/user.html',
          controller: ['Profile', '$stateParams', function(Profile, $stateParams) {
            const vm2 = this;
            Profile.fetchProfile($stateParams.id).then(data => vm2.user = data);
          }],
          controllerAs: 'vm2'
        })
    }
  ]);


// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
// playing and experimenting a bit with auth
  app.run([
    '$rootScope',
    '$state',
    function($rootScope, $state) {
      // $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      //   // still playing around with this
      // });

      // $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      //   // and this
      // });
    }
  ]);
})();
