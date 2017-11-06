angular.module('app_hospitais.historico-doencas', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.historico-de-doencas", {
                url: "/minha-saude/historico-de-doencas",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/historico-de-doencas.html'
                    }
                }
            });

    });