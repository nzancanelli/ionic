 angular.module('app_hospitais.cadastro-medicamentos')

    .service('CadastroMedicamentoService', function ($q, $http) {
        
       return{
	    buscarMedicamentos: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'medicamentos/' + id_usuario).then(function (response) {
                    return response.data;
                });
        },            
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
