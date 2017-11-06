angular.module('app_hospitais.cadastro-medicamentos', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("menu.cadastro-medicamentos", {
        views : {
       'menuContent' : {
        url: "/medicamentos",
        templateUrl: 'app/medicamentos/cadastro-medicamento/cadastro-medicamentos.html',
        controller: 'CadastromedicamentosController'
         }
            }
    });

    $stateProvider
        .state("menu.editar-medicamentos", {        
        url: "/medicamentos/editar/:medicamento",  
        views : {
       'menuContent' : {      
        templateUrl: 'app/medicamentos/cadastro-medicamento/editar-medicamentos.html',
        controller: 'EditarmedicamentosController'
         }
            }
    });

});