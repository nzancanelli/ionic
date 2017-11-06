angular.module('app_hospitais.antecedentes_familiares')

    .service('AntecedenteFamiliarService', function ($q, $http) {

        return {
            buscarAntecendete: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'antecedentefamiliar/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarAntecendete: function (antecedente) {
                return $http.post(AppSettings.apiEndpoint + 'antecedentefamiliar', antecedente).then(function (response) {
                    return response.data;
                });
            },
            editarAntecendete: function (antecedente) {                
                          return $http.put(AppSettings.apiEndpoint + 'antecedentefamiliar', antecedente).then(function (response) {
                    return response.data;
                });
            },
            excluirAntecendete: function (id_antecedente) {
                return $http.delete(AppSettings.apiEndpoint + 'antecedentefamiliar/' + id_antecedente).then(function (response) {
                    return response.data;
                });
            }
        };
    });
