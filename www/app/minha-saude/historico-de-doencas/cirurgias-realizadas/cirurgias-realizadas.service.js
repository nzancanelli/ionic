angular.module('app_hospitais.cirurgias_realizadas')

    .service('CirurgiasRealizadasService', function ($q, $http) {

        return {
            buscarCirurgiasRealizadas: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'Cirurgia/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarCirurgiasRealizadas: function (cirurgia) {
                return $http.post(AppSettings.apiEndpoint + 'Cirurgia', cirurgia).then(function (response) {
                    return response.data;
                });
            },
            editarCirurgiasRealizadas: function (cirurgia) {
                return $http.put(AppSettings.apiEndpoint + 'Cirurgia', cirurgia).then(function (response) {
                    return response.data;
                });
            },
            excluirCirurgiasRealizadas: function (id_cirurgia_data) {
                return $http.delete(AppSettings.apiEndpoint + 'Cirurgia/' + id_cirurgia_data).then(function (response) {
                    return response.data;
                });
            }
        };
    });
