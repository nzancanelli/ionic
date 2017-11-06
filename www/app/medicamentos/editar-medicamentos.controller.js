angular.module('app_hospitais.cadastro-medicamentos')
 
    .controller('EditarmedicamentosController', function ($scope, $stateParams,$ionicPopup, $state,$filter, $ionicLoading,CadastroMedicamentoService,ionicDatePicker) {
           
       //console.log('Tela de edicao de medicamento');
              
       $scope.medicamento = angular.fromJson($state.params.medicamento);
       //console.log(' ############# Exibindo os dados do medicamento na tela de edicao ################');       
      //$scope.medicamento.DataInicioMedicacao=$filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
      
       //$scope.disablefrequencia=false; 

       //$scope.disableQtdePorCaixas=true;
       //$scope.disableQtdeCaixas=true;  
       
       //$scope.datahora = $filter('date')(new Date(), 'dd/MM/yyyy');       
       //$scope.DT_INICIO_MEDICAMENTO =new Date();                 
            
      //$scope.medicamento = {};
       
      $scope.somenteNumeros = /^[0-9]+$/;      
     
      $scope.somenteTexto=/^(\D)+$/
     // console.log('data  formatada antes === ',$scope.medicamento.DataInicioMedicacao);
     // $scope.dataAux = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy'); 
     // $scope.medicamento.DataInicioMedicacao =new Date();
     // $scope.medicamento.DataInicioMedicacao= $scope.dataAux;
      //console.log('data  formatada depois=== ',$scope.medicamento.DataInicioMedicacao);
    
      $scope.datahora = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');       
      $scope.medicamento.DataInicioMedicacao = $scope.datahora;

     $scope.abrirPopupCalendario = function () {

            var configuracoes = {
                callback: function (data) {
                    $scope.medicamento.DataInicioMedicacao= new Date(data);                   
                    $scope.datahora = $filter('date')( $scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');       
                    $scope.medicamento.DataInicioMedicacao = $scope.datahora;    
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd/MM/yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            }
            ionicDatePicker.openDatePicker(configuracoes)
        }   

      $scope.confirmarEdicaoMedicamento = function()
      {
      // var dataformatada =   $filter('date')($scope.medicamento.DataInicioMedicacao, 'yyyy-MM-dd');
     //  //console.log('dataformatada=====####= ',dataformatada); 

       $scope.dataformatadaAux =   $scope.medicamento.DataInicioMedicacao;
       $scope.dataformatada= $scope.dataformatadaAux.substr(6,4)  + "-" + $scope.dataformatadaAux.substr(3,2)+  "-" + $scope.dataformatadaAux.substr(0,2)+ "T00:00:00"
       //console.log('dataformatada=====####= ',$scope.dataformatada);
                     
        //medicamento.DataInicioMedicacao
         var paramDadosMedicamento = { 
                Id:$scope.medicamento.Id,       
                IdUsuario: $rootScope.id,
                NomeMedicamento:$scope.medicamento.NomeMedicamento,               
                Dose:$scope.medicamento.Dose,
                Diario:$scope.medicamento.Diario,
                Frequencia:$scope.medicamento.Frequencia,
                DataInicioMedicacao:$scope.dataformatada,                
                TotalDias:$scope.medicamento.TotalDias,
                IntervaloHoras:$scope.medicamento.IntervaloHoras,
                Estoque:$scope.medicamento.Estoque,
                QtdPorCaixa:$scope.medicamento.QtdPorCaixa,
                QtdCaixas:$scope.medicamento.QtdCaixas,
                TempoAdiantamentoMinutos:$scope.medicamento.TempoAdiantamentoMinutos,
                SomAlarme:$scope.medicamento.SomAlarme,
                VibracaoAlarme:$scope.medicamento.VibracaoAlarme,
                ToqueAlarme:$scope.medicamento.ToqueAlarme             
               
             }              

           CadastroMedicamentoService.editarMedicamento(paramDadosMedicamento).then(function (dados) {                            
                  //console.log("Salvando a edicao ollhando a data:::" + paramDadosMedicamento.DataInicioMedicacao);
                  $state.go('medicamentos');
             },
              function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });                   
        
      }       
             
        $scope.FlDiarioMarcado = function (Diario) {
            //console.log('flag de Diario===  ',Diario);
             //$scope.disablefrequencia=FL_DIARIO; 
        }; 

        $scope.controlarEstoque = function (Estoque) {
             $scope.disableQtdePorCaixas=!Estoque;
             $scope.disableQtdeCaixas=!Estoque;      
             console.log('flag de estoque ===  ',Estoque);
        };        

        $scope.adicionarHorario = function (valor) {             
             //console.log('Valor de teste',valor);   
             //1,2,3,4,6,8,12,24 : horarios validos 
             if (valor!=1 && valor!=2 && valor!=3 && valor!=4 && valor!=6 && valor!=8 && valor!=12 && valor!=24 )
             {                 
                $ionicPopup.alert({
                       template: "Intervalo em horas inválido",
                       title: 'Atenção'
                }); 
             }             
        };        
       
        $scope.ativarVibracaoAlarme = function (VibracaoAlarme) {             
             console.log('flag de vibracao',VibracaoAlarme);
        };  
            
         $scope.ativarToqueAlarme = function (ToqueAlarme) {             
             console.log('flag de Toque',ToqueAlarme);
        };
            
        $scope.excluirMedicamento = function (Id) { 
            //console.log("excluindo o registro");

            CadastroMedicamentoService.excluirMedicamento(Id).then(function (dados) {
                //console.log("excluindo o registro");
                $state.go('medicamentos');
            },
                function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
        
        } ; 
       
       $scope.suspenderMedicamento = function (Id) {           
            $ionicPopup.show({
              //templateUrl: 'popup-template.html' ,             
              title: 'Meus Medicamentos',
              subTitle: 'Deseja suspender definitivamente o uso desse medicamento?' ,             
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
                 //chamar o metodo para suspender   
                  $scope.excluirMedicamento(Id);
                }  
              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });
        }              
         
    })         



      

      
