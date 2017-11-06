angular.module('app_hospitais.principal', [])

.config(function ($stateProvider) {
    $stateProvider
       .state("menu.principal", {
        url: "/principal", 
         views : {  
              'menuContent' : {     
              templateUrl: 'app/principal/principal.html',
              controller: 'PrincipalController'
                  }
         }
       })  
});