angular.module('app_hospitais.medicamentos')

.controller('HistoricoMedicamentosController', function ($scope, $state, $ionicPopup,$filter,HistoricoMedicamentoService) {
                
        $scope.medicamento = angular.fromJson($state.params.medicamento);       
        $scope.QtdeVezes=0;
        $scope.listaHorariosHistorico = [];              
        var dataformatada = $filter('date')($scope.medicamento.DataInicioMedicacao, 'dd/MM/yyyy');
        $scope.dataInicioFormatada=dataformatada;         
                              
        $scope.primeiroRegistro=true;
        $scope.listaHorariosDia=[];
        
		HistoricoMedicamentoService.buscarHistoricoMedicamento($scope.medicamento.Id).then(function (dados) { 
         
            //console.log("#  id do medicamento  #  "  + $scope.medicamento.Id);
            angular.forEach(dados, function (item) {                 
                
                var dataformatadaHistorico = $filter('date')(item.HorarioAgendado, 'dd/MM/yyyy');
                var horarioFormatadoHistorico=  $filter('date')(item.HorarioAgendado, 'HH:mm');
                               
                if($scope.primeiroRegistro==true)
                {
                   //console.log("########## Primeiro registro  ###### ");
                   $scope.dataAnterior= dataformatadaHistorico; 
                   $scope.listaHorariosDia.push({Horario:horarioFormatadoHistorico}); 
                }
                else{
                   if ($scope.dataAnterior == dataformatadaHistorico)
                   {
                    $scope.listaHorariosDia.push({Horario:horarioFormatadoHistorico});
                    //console.log("# data igual #  "  + dataformatadaHistorico);
                   }
                   else{
                    //console.log("### data diferente add na lista historico ###"  + dataformatadaHistorico);
                    $scope.listaHorariosHistorico.push({DataHistorico: $scope.dataAnterior,Horarios:$scope.listaHorariosDia})
                    $scope.listaHorariosDia=[];
                    $scope.listaHorariosDia.push({Horario:horarioFormatadoHistorico});
                   }
                   $scope.dataAnterior= dataformatadaHistorico; 
                }       

                $scope.primeiroRegistro=false;         
                                                
                if(item.Tomou==true){                   
                    $scope.QtdeVezes=$scope.QtdeVezes+1;
                }    
                //console.log("item.Historico.Tomou >>>>  ======  "  + item.Tomou);                               
            });  

            $scope.listaHorariosHistorico.push({DataHistorico: $scope.dataAnterior,Horarios:$scope.listaHorariosDia})
            $scope.QtdeEmEstoque = ($scope.medicamento.QtdPorCaixa * $scope.medicamento.QtdCaixas)-$scope.QtdeVezes;
                                             
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });          
                            
});
