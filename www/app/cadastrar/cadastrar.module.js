angular.module('app_hospitais.cadastrar', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("menu.cadastrar", {            
        url: "/cadastrar",
          views : {
            'menuContent' : {
                templateUrl: 'app/cadastrar/cadastrar.html',
                controller: 'CadastrarController'
            }
    }     
})
});



