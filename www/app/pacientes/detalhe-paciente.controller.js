
angular.module('app_hospitais.pacientes')

.controller('DetalhePacienteController', function ($scope, $location, $ionicPopup, $state, $stateParams, $ionicLoading, PacientesService, $filter, $rootScope) {    
    console.log('detalhe');
    $scope.service = PacientesService;
    $scope.pacientes = PacientesService.pacientes;
    $scope.pacient   = PacientesService.paciente;
    $scope.salvaOk = true;
    $scope.matriculaOk = false;

    $scope.idpaciente = {};
    $scope.paciente = {};
    
    $scope.convenios = [];
    $scope.convenio = [];

    $scope.DataNascimento = {};

    $scope.mostrarMatricula = true;

   
    if ($state.params.id_paciente > 0)
    {
        PacientesService.obterPaciente($state.params.id_paciente).then(function(dados){
            $scope.paciente = dados;
            $scope.DataNascimento.Correta = new Date($scope.paciente.DataNascimento);
            $rootScope.nmpaciente = $scope.paciente.Nome;
            $scope.salvaOk = false;

    });
    }else{
        $scope.paciente.Id_Usuario = PacientesService.Id_Usuario;
        $scope.DataNascimento.Correta = new Date(Date.now());
    }

    PacientesService.obterConvenios().then(function(dados){
        $scope.convenios = dados;

        //Selecionar o Convenio
        if ($state.params.id_paciente > 0)
        {
            $scope.convenio = $filter('filter')($scope.convenios, {Id:$scope.paciente.IdConvenio})[0];
        }
    });

    $scope.$on('$ionicView.loaded', function(){
    //	PacientesService.buscarPacientes();	
    });

    $scope.VerificarConvenio = function(id)
    {
        
        if ( AppSettings.codigo_id_operadora_amil == id )
            {
            //pegar dados no servico da operadora
           // alert("Amil");
            $scope.mostrarMatricula = true;
            }
        else if( AppSettings.codigo_id_operadora_particular == id )
            {
           // alert("Particular");
            $scope.mostrarMatricula = false;
        }
            else{
           // alert("Outras");            
            $scope.mostrarMatricula = true;
            }
    };

    $scope.VerificandoMatricula = function()
    {
        var dados = {

            Numero: $scope.paciente.NumeroMatricula,
            Data_Nascimento :  $scope.DataNascimento.Correta            
        }

        PacientesService.verificarMatricula(dados).then(function(response){
                  if (response != null) {
                      $scope.matriculaOk = true;
                      return true  
                  } else{
                      $ionicPopup.alert({
                      template: 'Beneficiário não existe',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    });
                    return false;  

                  }
                 
                }, function(erro) {
                     $ionicPopup.alert({
                      template: 'Erro ao verificar beneficiário',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    }); 
                    return false;   
                   
                });
        
          };


    $scope.VerificarElegibilidade = function(numero_matricula)
    {

        PacientesService.verificarElegibilidade(numero_matricula).then(function(dados){
                  if (dados.elegivel) {
                      return true  
                  } else{
                      $ionicPopup.alert({
                      template: 'plano do paciente não e elegível',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    });  
                  }
                 
                }, function(erro) {
                     $ionicPopup.alert({
                      template: 'Erro ao  verificar Elegibilidade',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    });  
                   
                });       
      
    };

    $scope.detalharPaciente = function (id) {
     
        $state.go("detalhe-paciente", {
            id_paciente: id
        });
    };

    $scope.preferencial = function () {
     
        $state.go("menu.preferencial");
    };

    $scope.excluirPaciente = function (id_paciente) { 
    $ionicPopup.show({
        //templateUrl: 'popup-template.html' , 
        title: 'Pacientes', subTitle: 'Tem certeza de deseja apagar o paciente?' , 
        scope: $scope, buttons: [
            { 
                text: 'Não',
                onTap: function(e) 
                {
                    return 'Não'; 
                } 
            },
            {
                text: '<b>Sim</b>',
                type: 'button-positive',
                onTap: function(e) 
                {
                    return "Sim";
                }
            }, ]}).then(function(res) {
                    if (res=='Não')
                    { 
                        $state.go($state.current, {}, {reload:true})
                    }
                    else
                    { 
                        var id_paciente = $scope.paciente.Id;
                        $scope.onItemDelete(id_paciente);

                    } 
                }, function(err) 
                {
                        console.log('Err:', err);
                }, function(msg) 
                    {
                        console.log('message:', msg);
                }); 
            };

  
    $scope.onItemDelete = function(id_paciente) {

      PacientesService.deletarPaciente(id_paciente).then(function(dados){
            $state.go($state.current, {}, {reload: true})
        });
    },    
         

        
    $scope.salvarPaciente = function(){
        
        $scope.paciente.DataNascimento = $scope.DataNascimento.Correta;
        $scope.paciente.IdConvenio = $scope.convenio.Id;
        

     // beneficiario   if ($scope.VerificandoMatricula()) {
            
       
       
        

      //  if ($state.params.id_paciente > 0)
       //     {
      //          PacientesService.editarPaciente($state.params.id_paciente, $scope.paciente).then(function(dados){
      //              $state.go("pacientes", {Id_Usuario: $scope.paciente.Id_Usuario}, {reload: true});
      //          }, function(erro) {
      //              alert('Ocorreu um erro');
      //          });
      //      }
     //   else{
         {
                PacientesService.salvarPaciente($scope.paciente).then(function(dados){
                    $ionicPopup.alert({
                      template: 'Paciente cadastrado com sucesso',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    });  
                    $scope.salvaOk = false;
                    $state.go("menu.pacientes", {Id_Usuario: $scope.paciente.Id_Usuario}, {reload: true});
                }, function(erro) {
                     $ionicPopup.alert({
                      template: 'Erro de gravação do Paciente',
                      title: 'Mensagem',
                      cssClass: 'alerta'                    
                    });  
                    
                });
            }
    //  beneficiario   }
}

$scope.usuarioPreferencial = function (preferencial){

         var dadosPaciente = {
             CodigoCorporativo: 1,
             Especialidade:  $rootScope.especialidade,
             Convenio :  $scope.pacient.Idconvenio,
             NumeroMatricula:  $scope.pacient.NumeroMatricula,
             DataNascimento :  $scope.pacient.DataNascimento,
             Nome: $scope.pacient.Nome,
             CPF: $scope.pacient.CPF,
             Telefone: $scope.pacient.Telefone,
             Preferencial: preferencial
         }

            $rootScope.preferencial = preferencial;
            $state.go('menu.finalizar-pretriagem'); 
                    
        /* PacientesService.verificarPreTriagemValida(dadosPaciente).then(function (response) {             
               
                $state.go('menu.finalizarPreTriagem');  
                      
             }, function (error) {
                        
                    $ionicPopup.alert({
                       template: 'Paciente já tem pre-triagem ativa numero : ' + responde.data.numeroPretriagem,
                        title: 'Ateção',
                        cssClass: 'alerta'
                    });           
             
             })   
*/
  }    
    
  }
);
