(function() {
  'use strict';

  angular.module('taskodoroApp', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // Firebase
    'firebase'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$animateProvider'];

  function config($urlProvider, $locationProvider, $animateProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    // http://goo.gl/HgA1Em
    $animateProvider.classNameFilter(/animate-/);

  }

  function run() {
    FastClick.attach(document.body);
  }

})();
