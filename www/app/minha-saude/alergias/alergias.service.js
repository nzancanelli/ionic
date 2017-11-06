angular.module('app_hospitais.alergias')

    .service('AlergiasService', function ($q, $http) {

        return {
            buscarAlergias: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'alergias/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarAlergia: function (alergia) {
                return $http.post(AppSettings.apiEndpoint + 'alergias', alergia).then(function (response) {
                    return response.data;
                });
            },
            editarAlergia: function (alergia) {
                return $http.put(AppSettings.apiEndpoint + 'alergias', alergia).then(function (response) {
                    return response.data;
                });
            },
            excluirAlergia: function (id_alergia) {                
                return $http.delete(AppSettings.apiEndpoint + 'alergias/' + id_alergia).then(function (response) {
                    return response.data;
                });
            }
        };
    });
