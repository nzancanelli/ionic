angular.module('app_hospitais.habitos', ['relativeDate'])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.habitos", {
                url: "/minha-saude/habitos",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/habitos.html',
                        controller: 'HabitoController'
                    }
                }
            });

        $stateProvider
            .state("menu.editar-detalhe-bebidas", {
                url: "/minha-saude/habitos/editar-detalhe-bebidas/:habito",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-bebidas.html',
                        controller: 'EditarHabitoBebidasController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar-detalhe-bebidas", {
                url: "/minha-saude/habitos/adicionar-detalhe-bebidas/:habito",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-bebidas.html',
                        controller: 'AdicionarHabitoBebidasController'
                    }
                }
            });


        $stateProvider
            .state("menu.editar-detalhe-ativ-fisica", {
                url: "/minha-saude/habitos/editar-detalhe-ativ-fisica/:habito",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-ativ-fisica.html',
                        controller: 'EditarHabitoAtivFisicaController'
                    }
                }
            });

        $stateProvider
            .state("menu.adicionar-detalhe-ativ-fisica", {
                url: "/minha-saude/habitos/adicionar-detalhe-ativ-fisica/:habito",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-ativ-fisica.html',
                        controller: 'AdicionarHabitoAtivFisicaController'
                    }
                }
            });

        $stateProvider
            .state("menu.editar-detalhe-tabagismo", {
                url: "/minha-saude/habitos/editar-detalhe-tabagismo/:habito",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-tabagismo.html',
                        controller: 'EditarHabitoTabagismoController'
                    }
                }
            });
        $stateProvider
            .state("menu.adicionar-detalhe-tabagismo", {
                url: "/minha-saude/habitos/adicionar-detalhe-tabagismo",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/habitos/detalhe-tabagismo.html',
                        controller: 'AdicionarHabitoTabagismoController'
                    }
                }
            });

    });