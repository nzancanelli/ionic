angular.module('app_hospitais.cadastro-medicamentos', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("cadastro-medicamentos", {
        url: "/medicamentos",
        templateUrl: 'app/medicamentos/cadastro-medicamentos.html',
        controller: 'CadastromedicamentosController'
    });

    $stateProvider
        .state("editar-medicamentos", {
        url: "/medicamentos/editar/:medicamento",
        templateUrl: 'app/medicamentos/editar-medicamentos.html',
        controller: 'EditarmedicamentosController'
    });

});