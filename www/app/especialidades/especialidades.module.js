angular.module('app_hospitais.especialidades', [])

.config(function ($stateProvider) {
    $stateProvider
        .state("menu.especialidades", {
        url: "/especialidades",
            views : {  
              'menuContent' : {               
             templateUrl: 'app/especialidades/especialidades.html',
             controller: 'EspecialidadesController' 

                    }
         }
       })         
       
        .state("menu.especialidades-por-unidade", {
        url: "/especialidades-por-unidade/:idHospital",
            views : {  
              'menuContent' : {               
             templateUrl: 'app/especialidades/especialidades-por-unidade.html',
             controller: 'EspecialidadesPorUnidadeController' 

                    }
         }
       })  
             
        
});
