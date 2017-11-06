angular.module('app_hospitais.cadastro-medicamentos')
 
    .controller('CadastromedicamentosController', function ($scope, $stateParams,$ionicPopup, $state,$filter, $ionicLoading,CadastroMedicamentoService,ionicDatePicker) {
                
       $scope.medicamento = {};
       $scope.disablefrequencia=false; 

       $scope.disableQtdePorCaixas=true;
       $scope.disableQtdeCaixas=true;  
       
      $scope.datahora = $filter('date')(new Date(), 'dd/MM/yyyy');       
      $scope.medicamento.dtInicioMedicamento = $scope.datahora;           
      
      $scope.listaHorarios = {};
       
      $scope.somenteNumeros = /^[0-9]+$/;      
     
      $scope.somenteTexto=/^(\D)+$/

      $scope.abrirPopupCalendario = function () {

            var configuracoes = {
                callback: function (data) {                   
                  $scope.medicamento.dtInicioMedicamento= new Date(data);
                  $scope.datahora = $filter('date')( $scope.medicamento.dtInicioMedicamento, 'dd/MM/yyyy');       
                  $scope.medicamento.dtInicioMedicamento = $scope.datahora;           
      
                  //console.log('teste select data=== ',$scope.medicamento.dtInicioMedicamento);
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd/MM/yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            }
            ionicDatePicker.openDatePicker(configuracoes)
        }   
      
      $scope.adicionarMedicamento = function()
      {      
    
       //console.log('data antes da formatacao =====####= ',$scope.medicamento.dtInicioMedicamento);
      
       $scope.dataformatadaAux =   $scope.medicamento.dtInicioMedicamento;
       $scope.dataformatada= $scope.dataformatadaAux.substr(6,4)  + "-" + $scope.dataformatadaAux.substr(3,2)+  "-" + $scope.dataformatadaAux.substr(0,2)+ "T00:00:00"
       //console.log('dataformatada=====####= ',$scope.dataformatada);
        
       //"2017-08-11T00:00:00"

        var valorFrequencia=$scope.medicamento.Frequencia; 
        
        if ($scope.medicamento.flagDiario==true)
        {          
          valorFrequencia=0;  
        }    
        
        $scope.listaHorariosMedicamento = [];
        angular.forEach($scope.listaHorarios, function (item) {             
              var valorHorario = $scope.medicamento.dtInicioMedicamento + " " +  item.Horario + ":00"              
              $scope.listaHorariosMedicamento.push({"Horario" : valorHorario});              
        });
        
         var paramDadosMedicamento = {          
             IdUsuario: $rootScope.id,
                NomeMedicamento:$scope.medicamento.nmMedicamento,               
                Dose:$scope.medicamento.Dose,
                Diario:$scope.medicamento.flagDiario,
                Frequencia:valorFrequencia,
                DataInicioMedicacao:$scope.dataformatada,            
                TotalDias:$scope.medicamento.totalDias,
                IntervaloHoras:$scope.medicamento.intervaloHora,
                Estoque:$scope.medicamento.flagEstoque,
                QtdPorCaixa:$scope.medicamento.qtdePorCaixa,
                QtdCaixas:$scope.medicamento.qtdeDeCaixas,
                TempoAdiantamentoMinutos:10,
                SomAlarme:$scope.medicamento.somAlarme ,
                VibracaoAlarme:$scope.medicamento.flagVibracaoAlarme,
                ToqueAlarme:$scope.medicamento.flagToqueAlarme, 
                Horarios: $scope.listaHorariosMedicamento,                               
                
             }
            CadastroMedicamentoService.salvarMedicamento(paramDadosMedicamento).then(function (dados) {                            
                  //console.log("Salvando o registro e exibindo a data  " +paramDadosMedicamento.DataInicioMedicacao );
                  //console.log("lista de horarios  " +$scope.listaHorarios );                   
                  $state.go('medicamentos');
             },
              function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });           
      }        
         
        $scope.FlDiarioMarcado = function (FL_DIARIO) {             
             $scope.disablefrequencia=FL_DIARIO; 
        }; 

        $scope.controlarEstoque = function (FL_ESTOQUE) {
             $scope.disableQtdePorCaixas=!FL_ESTOQUE;
             $scope.disableQtdeCaixas=!FL_ESTOQUE;      
        };        

        $scope.adicionarHorario = function (valor,dose) {             
             //console.log('Valor de teste 1',valor);   
             //1,2,3,4,6,8,12,24 : horarios validos 
             if (valor!=1 && valor!=2 && valor!=3 && valor!=4 && valor!=6 && valor!=8 && valor!=12 && valor!=24 )
             {                 
                $ionicPopup.alert({
                       template: "Intervalo em horas inválido",
                       title: 'Atenção'
                }); 
             } 
             else{
               $scope.listaHorarios = [];
                             
             var valorHorario=8;
             //console.log('Valor de teste 2',valor);  
             while(valorHorario<=24){ 
                  
                  var horario="";
                  if (valorHorario<10)
                  {
                     horario="0" + valorHorario+":00";
                  }                 
                  else 
                  {
                      if (valorHorario==24){
                         horario="00:00";
                      }
                      else{
                         horario=valorHorario+":00"
                      }                       
                  }
                  $scope.listaHorarios.push({"Horario" : horario,"Dose":dose});   
                  valorHorario=valorHorario+parseFloat(valor);                                    
             }             

             }        
        };        
             

       $scope.cancelarMedicamento = function () {           
            $ionicPopup.show({
              //templateUrl: 'popup-template.html' ,             
              title: 'Meus Medicamentos',
              subTitle: 'Tem certeza de deseja sair sem confirmar o cadastro do medicamento?' ,             
              scope: $scope,
              buttons: [
                { text: 'Não', onTap: function(e) { return 'Não'; } },
                {
                  text: '<b>Sim</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return "Sim";
                  }
                },
              ]
              }).then(function(res) {                
                if (res=='Não')
                {                   
                   $state.go($state.current, {}, {reload: true})
                }
                else{                 
                  $state.go('medicamentos')
                }  
              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });
        }
         
    })
    

         
       
               

      



      

      
        
    

         
       
               

      



      

      
