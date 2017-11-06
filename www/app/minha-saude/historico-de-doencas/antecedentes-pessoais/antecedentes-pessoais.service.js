angular.module('app_hospitais.antecedentes_pessoais')

    .service('AntecedentePessoalService', function ($q, $http) {

        return {
            buscarAntecendete: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'antecedentepessoal/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarAntecendete: function (antecedente) {
                return $http.post(AppSettings.apiEndpoint + 'antecedentepessoal', antecedente).then(function (response) {
                    return response.data;
                });
            },
            editarAntecendete: function (antecedente) {
                return $http.put(AppSettings.apiEndpoint + 'antecedentepessoal', antecedente).then(function (response) {
                    return response.data;
                });
            },
            excluirAntecendete: function (id_antecedente) {
                return $http.delete(AppSettings.apiEndpoint + 'antecedentepessoal/' + id_antecedente).then(function (response) {
                    return response.data;
                });
            }
        };
    });
