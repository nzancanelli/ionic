angular.module('app_hospitais.alterarsenha', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("menu.alterarsenha", {
        url: "/alterarsenha",
        views : {
            'menuContent' : {
        templateUrl: 'app/alterarsenha/alterarsenha.html',
        controller: 'AlterarsenhaController'
            }
        }
    })        
});