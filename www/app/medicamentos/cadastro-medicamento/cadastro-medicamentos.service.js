 angular.module('app_hospitais.cadastro-medicamentos')

    .service('CadastroMedicamentoService', function ($q, $http) {
        
       return{	    
		salvarMedicamento : function(medicamento){
			    return $http.post(AppSettings.apiEndpoint + 'medicamentos',medicamento).then(function (response) {
				return "Deu certo.";
			   });
        },         
        editarMedicamento: function (medicamento) {
                return $http.put(AppSettings.apiEndpoint + 'medicamentos', medicamento).then(function (response) {
                    return response.data;
                });
        },
        excluirMedicamento: function (id_medicamento) {               
                return $http.delete(AppSettings.apiEndpoint + 'medicamentos/' + id_medicamento).then(function (response) {
                    return response.data;
                });
       }                 

	};

});
