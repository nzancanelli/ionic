angular.module('app_hospitais.medicamentos', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.medicamentos", {
                url: "/medicamentos",
                views: {
                    'menuContent': {
                        templateUrl: 'app/medicamentos/medicamentos.html',
                        controller: 'MedicamentosController'
                    }
                }
            });

        $stateProvider
            .state("historicoMedicamento", {
                url: "/medicamentos/historico/:medicamento",
                templateUrl: 'app/medicamentos/historico-medicamento.html',
                controller: 'HistoricoMedicamentosController'
            });

        $stateProvider
            .state("alarmeMedicamento", {
                url: "/medicamentos/alarme/:medicamento",
                templateUrl: 'app/medicamentos/alarme-medicamentos.html',
                controller: 'AlarmeMedicamentosController'
            });

    });   
