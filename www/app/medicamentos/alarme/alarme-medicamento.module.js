angular.module('app_hospitais.alarme-medicamento', [])

    .config(function ($stateProvider) {
        
         $stateProvider
            .state("menu.alarmeMedicamento", {
                url: "/medicamentos/alarme/:medicamento",
                 views : {
                'menuContent' : {
                templateUrl: 'app/medicamentos/alarme/alarme-medicamentos.html',
                controller: 'AlarmeMedicamentosController'   
                }
                 }             
            });      
    });   