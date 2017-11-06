
angular.module('app_hospitais.menu')
.controller('MenuController', function($rootScope, $scope,  $location,  $localStorage, $state){

		$scope.usuarioLogado = $rootScope.usuario;
		console.log('alterarSenha');

		$scope.fechar = function() {        
				
			$localStorage.removeitem('usuarioLogado');
				$localStorage.removeitem ('hospital');
				$rootScope.usuario = null;  
				$scope.usuarioLogado = null;
						 
				$state.go('shared');
			 }


			 $scope.pacientes = function() {

			// $state.go('pacientes/2'); 
	 //  if ($scope.usuarioLogado != null) {  
					 $location.path('pacientes/1');  
				//     $state.go('pacientes/1');
		//      } 
			 }

			 $scope.alterarsenha = function() {

					 if ($scope.usuarioLogado != null && (Object.keys($scope.usuarioLogado).length > 0)) { 
							 $scope.usuario.email = "";
							 $scope.usuario.senha = ""; 
								$state.go('menu.alterarsenha'); 
					 } 
			 }     
});  
