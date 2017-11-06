angular.module('app_hospitais.antecedentes_familiares', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.antecedentes-familiares", {
                url: "/minha-saude/historico-de-doencas/antecedentes-familiares",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-familiares/antecedentes-familiares.html',
                        controller: 'AntecedentesFamiliaresController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar-antecedentes-familiares", {
                url: "/minha-saude/historico-de-doencas/antecedentes-familiares/adicionar-antecedentes-familiares",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-familiares/adicionar-antecedentes-familiares.html',
                        controller: 'AdicionarAntecedentesFamiliaresController'
                    }
                }
            });
        $stateProvider
            .state("menu.editar-antecedentes-familiares", {
                url: "/minha-saude/historico-de-doencas/antecedentes-familiares/editar-antecedentes-familiares/:antecedente",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-familiares/adicionar-antecedentes-familiares.html',
                        controller: 'EditarAntecedentesFamiliaresController'
                    }
                }
            });
    });