angular.module('app_hospitais.historico-medicamento', [])

    .config(function ($stateProvider) {
        
        $stateProvider
            .state("menu.historicoMedicamento", {
                url: "/medicamentos/historico/:medicamento",
                views : {
                'menuContent' : {
                templateUrl: 'app/medicamentos/historico/historico-medicamento.html',
                controller: 'HistoricoMedicamentosController'
                }
            }                
            });           
    });   