angular.module('app_hospitais.medicamentos')
    .service('medicamentosService', function ($q, $http) {
        return {
            buscarMedicamentos: function (id_usuario) {                
                return $http.get(AppSettings.apiEndpoint + 'medicamentos/' + id_usuario).then(function (response) {
                    return response.data;
                });
            }
        };

    });
