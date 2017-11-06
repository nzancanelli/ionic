angular.module('app_hospitais.cirurgias_realizadas', ['relativeDate'])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.cirurgias-realizadas", {
                url: "/minha-saude/historico-de-doencas/cirurgias-realizadas",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/cirurgias-realizadas/cirurgias-realizadas.html',
                        controller: 'CirurgiasRealizadasController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar-cirurgias-realizadas", {
                url: "/minha-saude/historico-de-doencas/cirurgias-realizadas/adicionar-cirurgias-realizadas",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/cirurgias-realizadas/adicionar-cirurgias-realizadas.html',
                        controller: 'AdicionarCirurgiasRealizadasController'
                    }
                }
            });
        $stateProvider
            .state("menu.editar-cirurgias-realizadas", {
                url: "/minha-saude/historico-de-doencas/cirurgias-realizadas/editar-cirurgias-realizadas/:cirurgia",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/cirurgias-realizadas/adicionar-cirurgias-realizadas.html',
                        controller: 'EditarCirurgiasRealizadasController'
                    }
                }
            });
    });