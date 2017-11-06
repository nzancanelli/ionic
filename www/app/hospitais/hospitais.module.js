//angular.module('app_hospitais.hospitais', ['utils.filters'])
angular.module('app_hospitais.hospitais', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("menu.hospitais", {
            url: "/hospitais?especialidade&latitude&longitude",
            views : {
            'menuContent' : {
               templateUrl: 'app/hospitais/hospitais.html',
               controller: 'HospitaisController'
        }
       }
    })
           
   
        .state('menu.detalhe-hospital', {
            url: "/app/hospitais/:idHospital",
            views : {
            'menuContent' : {
            templateUrl: 'app/hospitais/detalhe-hospital.html',
            controller: 'DetalheHospitalController'
             }
       }
        }) 

        .state('menu.hospitais-busca-geral', {
            url: "/hospitais-busca-geral",
            views : {
            'menuContent' : {
            templateUrl: 'app/hospitais/hospitais-busca-geral.html',
            controller: 'HospitaisBuscaGeralController'
             }
       }
        }) 
});
