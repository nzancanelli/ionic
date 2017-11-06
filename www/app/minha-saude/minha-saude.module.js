angular.module('app_hospitais.minhasaude', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state("menu.minha-saude", {
                url: "/minha-saude",
                views: {
                    'menuContent': {
                        templateUrl: 'app/minha-saude/minha-saude.html'
                    }
                }
            })
    });
