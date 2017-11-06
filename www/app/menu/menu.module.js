angular.module('app_hospitais.menu', [])

.config(function ($stateProvider) {
    $stateProvider
.state('menu', {
	url : '/menu',
	templateUrl : 'app/menu/menu.html',
	abstract: true,
	controller: 'MenuController'
})
});
