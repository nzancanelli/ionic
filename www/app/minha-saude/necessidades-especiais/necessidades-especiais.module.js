angular.module('app_hospitais.necessidades-especiais', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.necessidades-especiais", {
                url: "/minha-saude/necessidades-especiais",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/necessidades-especiais/necessidades-especiais.html',
                        controller: 'NecessidadesEspeciaisController'
                    }
                }
            });
        $stateProvider
            .state("menu.detalhe-necessidades-especiais", {
                url: "/minha-saude/necessidades-especiais/detalhe-necessidades-especiais",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/necessidades-especiais/detalhe-necessidades-especiais.html',
                        controller: 'DetalheNecessidadesEspeciaisController'
                    }
                }
            });

    });
