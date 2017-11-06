angular.module('app_hospitais.pacientes', [])

.config(function ($stateProvider) {
    $stateProvider
        .state('menu.pacientes', {
        url: '/pacientes/:Id_Usuario',
         views : {
            'menuContent' : {            
        templateUrl: 'app/pacientes/pacientes.html',
        controller: 'PacientesController'   
            }
         }                    
     })

     $stateProvider
        .state('menu.detalhe-paciente', {
        url: '/pacientes/detalhe-paciente/:id_paciente',
         views : {
            'menuContent' : { 
        templateUrl: 'app/pacientes/detalhe-paciente.html',
        controller: 'DetalhePacienteController'
            }
        }
      });

      $stateProvider
        .state('menu.preferencial', {
        url: '/preferencial',
         views : {
            'menuContent' : { 
        templateUrl: 'app/pacientes/preferencial.html',
        controller: 'DetalhePacienteController'
            }
        }
      });  

      $stateProvider
        .state('menu.finalizar-pretriagem', {
        url: '/finalizar-pretriagem',
         views : {
            'menuContent' : { 
        templateUrl: 'app/pacientes/finalizar-pretriagem.html',
        controller: 'FinalizarPreTriagemController'
            }
        }
      }); 

      $stateProvider
        .state('menu.finalizacao-pretriagem', {
        url: '/finalizacao-pretriagem',
         views : {
            'menuContent' : { 
        templateUrl: 'app/pacientes/finalizacao-pretriagem.html',
        controller: 'FinalizarPreTriagemController'
            }
        }
      }) 

});

 
