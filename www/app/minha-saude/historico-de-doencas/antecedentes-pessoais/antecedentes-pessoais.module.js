angular.module('app_hospitais.antecedentes_pessoais', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.antecedentes-pessoais", {
                url: "/minha-saude/historico-de-doencas/antecedentes-pessoais",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-pessoais/antecedentes-pessoais.html',
                        controller: 'AntecedentesPessoaisController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar-antecedentes-pessoais", {
                url: "/minha-saude/historico-de-doencas/antecedentes-pessoais/adicionar-antecedentes-pessoais",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-pessoais/adicionar-antecedentes-pessoais.html',
                        controller: 'AdicionarAntecedentesPessoaisController'
                    }
                }
            });
        $stateProvider
            .state("menu.editar-antecedentes-pessoais", {
                url: "/minha-saude/historico-de-doencas/antecedentes-pessoais/editar-antecedentes-pessoais/:antecedente",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/historico-de-doencas/antecedentes-pessoais/adicionar-antecedentes-pessoais.html',
                        controller: 'EditarAntecedentesPessoaisController'
                    }
                }
            });
    });