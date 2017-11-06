angular.module('app_hospitais.medicamentos')

.controller('MedicamentosController', function ($scope, $state,CadastroMedicamentoService,ionicDatePicker) {                 
        
    $scope.toggleGroup = function (medicamento) {
        if ($scope.isGroupShown(medicamento)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = medicamento;
        }
    };
    $scope.isGroupShown = function (medicamento) {
        return $scope.shownGroup === medicamento;
    };          
   
      $scope.dataCadastro =new Date();

       $scope.abrirPopupCalendario = function () {

            var configuracoes = {
                callback: function (data) {
                    $scope.dataCadastro= new Date(data);
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd-MM-yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            }
            ionicDatePicker.openDatePicker(configuracoes)
        }
        
           
      $scope.listaMedicamentos  = {};
      //var dataformatada =   $filter('date')(dataCadastro, 'dd/MM/yyyy');
      //console.log('dataformatada=====####= ',dataformatada); 
      
       /*$scope.listaMedicamentos = [];
        var lista=[];

         CadastroMedicamentoService.buscarMedicamentos(1).then(function (dados) {                 
                
               console.log("exibindo toda a lista pesquisada por usuario======  "  +  dados);

               angular.forEach(dados, function (item) { 
               //console.log("exibindo os horarios======  "  +  item.Horarios);
                
               lista.push({DescricaoMedicamento: item.NomeMedicamento,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]}) 
               //lista.push(item) ;             
            });         
        }) 

        $scope.listaMedicamentos = lista;      */
                




      CadastroMedicamentoService.buscarMedicamentos($rootScope.id).then(function (dados) { 
            $scope.listaMedicamentos = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });   
                      
        $scope.cadastroMedicamentos  = function () {
        $state.go("cadastro-medicamentos");
    }; 
})


.controller('AlarmeMedicamentosController', function ($scope, $state, $ionicPopup,$filter) {
        
        //$scope.teste = "Teste na tela de historico";
         $scope.medicamento = angular.fromJson($state.params.medicamento);
         //$scope.dataInicio=new Date();
         $scope.QtdeVezes=0;
         $scope.listaHorariosHistorico = [];              
         var dataformatada = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
         $scope.dataInicioFormatada=dataformatada
          
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]})
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"16:00"},{Horario:"20:00"}]})
        
       
         $scope.medicamento.Horarios.Historico=[{"fl_tomou" : 0},{"fl_tomou" : 0},{"fl_tomou" : 1},{"fl_tomou" : 1}];							

         angular.forEach($scope.medicamento.Horarios.Historico, function (item) { 
               //console.log("exibindo os horarios======  "  +  item.Horarios);
                //console.log("item ativo ======  "  + item.fl_tomou);
                if (item.fl_tomou==1){
                    $scope.QtdeVezes=$scope.QtdeVezes+1;                     
                }               
               //lista.push({DescricaoMedicamento: item.NomeMedicamento,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]}) 
               //lista.push(item) ;             
         });      
        
         console.log('$scope.QtdeVezes= === ',$scope.QtdeVezes);      
         $scope.QtdeEmEstoque = ( $scope.medicamento.QtdPorCaixa * $scope.medicamento.QtdCaixas)- $scope.QtdeVezes;
         
         console.log(' ############# Exibindo os dados do medicamento na tela de historico ################');       
        //$scope.medicamento.DataInicioMedicacao=$filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
                  
        console.log('Id === ',$scope.medicamento.Id ); 
        console.log('nome do medicamento=== ',$scope.medicamento.NomeMedicamento );
        console.log('dose === ',$scope.medicamento.Dose );     
        console.log('DataInicioMedicacao === ',$scope.medicamento.DataInicioMedicacao );    
        console.log('QtdPorCaixa === ',$scope.medicamento.QtdPorCaixa); 
        console.log('QtdCaixas === ',$scope.medicamento.QtdCaixas); 
                
})


.controller('HistoricoMedicamentosController', function ($scope, $state, $ionicPopup,$filter) {
        
        //$scope.teste = "Teste na tela de historico";
         $scope.medicamento = angular.fromJson($state.params.medicamento);
         //$scope.dataInicio=new Date();
         $scope.QtdeVezes=0;
         $scope.listaHorariosHistorico = [];              
         var dataformatada = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
         $scope.dataInicioFormatada=dataformatada
          
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]})
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"16:00"},{Horario:"20:00"}]})
        
       
         $scope.medicamento.Horarios.Historico=[{"fl_tomou" : 0},{"fl_tomou" : 0},{"fl_tomou" : 1},{"fl_tomou" : 1}];							

         angular.forEach($scope.medicamento.Horarios.Historico, function (item) { 
               //console.log("exibindo os horarios======  "  +  item.Horarios);
                console.log("item ativo ======  "  + item.fl_tomou);
                if (item.fl_tomou==1){
                    $scope.QtdeVezes=$scope.QtdeVezes+1;                     
                }               
               //lista.push({DescricaoMedicamento: item.NomeMedicamento,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]}) 
               //lista.push(item) ;             
         });      
        
        // console.log('$scope.QtdeVezes= === ',$scope.QtdeVezes);      
         $scope.QtdeEmEstoque = ( $scope.medicamento.QtdPorCaixa * $scope.medicamento.QtdCaixas)- $scope.QtdeVezes;
         
     /*    console.log(' ############# Exibindo os dados do medicamento na tela de historico ################');       
        //$scope.medicamento.DataInicioMedicacao=$filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
                  
        console.log('Id === ',$scope.medicamento.Id ); 
        console.log('nome do medicamento=== ',$scope.medicamento.NomeMedicamento );
        console.log('dose === ',$scope.medicamento.Dose );     
        console.log('DataInicioMedicacao === ',$scope.medicamento.DataInicioMedicacao );    
        console.log('QtdPorCaixa === ',$scope.medicamento.QtdPorCaixa); 
        console.log('QtdCaixas === ',$scope.medicamento.QtdCaixas); */
                
}) ;


  




