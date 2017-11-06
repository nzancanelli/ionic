angular.module('app_hospitais.esquecisenha', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("esquecisenha", {
        url: "/esquecisenha",
        templateUrl: 'app/esquecisenha/esquecisenha.html',
        controller: 'EsquecisenhaController'
    })        
});