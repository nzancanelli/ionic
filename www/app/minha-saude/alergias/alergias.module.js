angular.module('app_hospitais.alergias', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.alergias", {
                url: "/minha-saude/alergias",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/alergias/alergias.html',
                        controller: 'AlergiasController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar", {
                url: "/minha-saude/alergias/adicionar",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/alergias/adicionar-alergia.html',
                        controller: 'AdicionarAlergiasController'
                    }
                }
            });
        $stateProvider
            .state("menu.editar", {
                url: "/minha-saude/alergias/editar/:alergia",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/alergias/adicionar-alergia.html',
                        controller: 'EditarAlergiasController'
                    }
                }
            });
    });
