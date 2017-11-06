angular.module('app_hospitais.medicamentos')

.controller('AlarmeMedicamentosController', function ($scope, $state, $ionicPopup,$filter) {
        
        //$scope.teste = "Teste na tela de historico";
         $scope.medicamento = angular.fromJson($state.params.medicamento);
         //$scope.dataInicio=new Date();
         //console.log('Id === ',$scope.medicamento.Id);

        //*********************************************************/        

        //$scope.listaHist = lista; 
        
        //*********************************************************/

         $scope.QtdeVezes=0;
         $scope.listaHorariosHistorico = [];              
         var dataformatada = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
         $scope.dataInicioFormatada=dataformatada
          
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]})
         $scope.listaHorariosHistorico.push({DataHistorico: dataformatada,Horarios:[{Horario:"08:00"},{Horario:"16:00"},{Horario:"20:00"}]})
        
       
         $scope.medicamento.Horarios.Historico=[{"fl_tomou" : 0},{"fl_tomou" : 0},{"fl_tomou" : 1},{"fl_tomou" : 1}];							

         angular.forEach($scope.medicamento.Horarios.Historico, function (item) { 
               //console.log("exibindo os horarios======  "  +  item.Horarios);
             //   console.log("item ativo ======  "  + item.fl_tomou);
                if (item.fl_tomou==1){
                    $scope.QtdeVezes=$scope.QtdeVezes+1;                     
                }                              

               //lista.push({DescricaoMedicamento: item.NomeMedicamento,Horarios:[{Horario:"08:00"},{Horario:"12:00"}]}) 
               //lista.push(item) ;             
         });      
        
       //  console.log('$scope.QtdeVezes= === ',$scope.QtdeVezes);      
         $scope.QtdeEmEstoque = ( $scope.medicamento.QtdPorCaixa * $scope.medicamento.QtdCaixas)- $scope.QtdeVezes;
      /*   
         console.log(' ############# Exibindo os dados do medicamento na tela de historico ################');       
        //$scope.medicamento.DataInicioMedicacao=$filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
                  
        console.log('Id === ',$scope.medicamento.Id ); 
        console.log('nome do medicamento=== ',$scope.medicamento.NomeMedicamento );
        console.log('dose === ',$scope.medicamento.Dose );     
        console.log('DataInicioMedicacao === ',$scope.medicamento.DataInicioMedicacao );    
        console.log('QtdPorCaixa === ',$scope.medicamento.QtdPorCaixa); 
        console.log('QtdCaixas === ',$scope.medicamento.QtdCaixas); */
                
})
