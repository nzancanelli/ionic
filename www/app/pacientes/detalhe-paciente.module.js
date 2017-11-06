angular.module('app_hospitais.detalhe-paciente', [])


 .directive('forceBind',  function() {
   console.log("diretiva force")  
  return {
    require: '^detalhe',
    priority: -1,
    link: function (scope, element, attrs, detalhe) {
        
       if (detalhe.$dirty && !$scope.salvaOk) {
        $scope.salvaOk = true
         
      }
    }
  };
});
