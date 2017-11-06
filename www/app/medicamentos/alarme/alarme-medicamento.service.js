angular.module('app_hospitais.alarme-medicamento')

    .service('AlarmeMedicamentoService', function ($q, $http) {
        
       return{
	        
        buscarHistoricoMedicamento: function (IdMedicamento) {
                return $http.get(AppSettings.apiEndpoint + 'HistoricoMedicamento/' + IdMedicamento).then(function (response) {
                    return response.data;
                });
        }    
	};
});
