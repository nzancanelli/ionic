angular.module('app_hospitais.medicamentos', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.medicamentos", {
                url: "/medicamentos",
                views : {
               'menuContent' : { 
                templateUrl: 'app/medicamentos/medicamento-em-uso/medicamentos.html',
                controller: 'MedicamentosController'
               }
            }
            });            
    });   