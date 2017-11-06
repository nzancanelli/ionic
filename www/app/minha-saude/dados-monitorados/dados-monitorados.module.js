angular.module('app_hospitais.dados-monitorados', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.dados-monitorados", {
                url: "/minha-saude/dados-monitorados",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/dados-monitorados/dados-monitorados.html',
                        controller: 'DadosMonitoradosController'
                    }
                }
            });
        $stateProvider
            .state("menu.parametro", {
                url: "/minha-saude/dados-monitorados/parametro",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/dados-monitorados/parametro-dados-monitorados.html',
                        controller: 'AdicionarParametroController'
                    }
                }
            });
        $stateProvider
            .state("menu.historico", {
                url: "/minha-saude/dados-monitorados/historico/:ID_PARAMETRO",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/dados-monitorados/historico-dados-monitorados.html',
                        controller: 'HistoricoDadosMonitoradosController'
                    }
                }
            });
        $stateProvider
            .state("menu.valor-dados-monitorados", {
                url: "/minha-saude/dados-monitorados/valor-dados-monitorados/:ID_PARAMETRO",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/dados-monitorados/valor-dados-monitorados.html',
                        controller: 'ValorDadosMonitoradosController'
                    }
                }
            });
        $stateProvider
            .state("menu.periodo-dados-monitorados", {
                url: "/minha-saude/dados-monitorados/periodo-dados-monitorados/:ID_PARAMETRO",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/dados-monitorados/periodo-dados-monitorados.html',
                        controller: 'PeriodoDadosMonitoradosController'
                    }
                }
            });

    });
