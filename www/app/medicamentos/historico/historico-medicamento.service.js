 angular.module('app_hospitais.historico-medicamento')

    .service('HistoricoMedicamentoService', function ($q, $http) {
        
       return{
	        
        buscarHistoricoMedicamento: function (IdMedicamento) {
                return $http.get(AppSettings.apiEndpoint + 'HistoricoMedicamento/' + IdMedicamento).then(function (response) {
                    return response.data;
                });
        }       
        		
	};

});
