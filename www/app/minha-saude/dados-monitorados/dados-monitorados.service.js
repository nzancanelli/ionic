angular.module('app_hospitais.dados-monitorados')

    .service('DadosMonitoradosService', function ($q, $http) {

        return {
            buscarParametrosDadosMonitorados: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'DadoMonitorado/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarParametroDadosMonitorados: function (parametro) {
                return $http.post(AppSettings.apiEndpoint + 'DadoMonitorado', parametro).then(function (response) {
                    return response.data;
                });
            },
            salvarValorParametroDadosMonitorados: function (valor_parametro) {
                return $http.delete(AppSettings.apiEndpoint + 'DadoMonitorado', valor_parametro).then(function (response) {
                    return response.data;
                });
            },
            buscarValoresParametrosDadosMonitorados: function (id_usuario, id_parametro) {
                return $http.get(AppSettings.apiEndpoint + 'DadoMonitorado/' + id_usuario + "/" + id_parametro).then(function (response) {
                    return response.data;
                });
            },
            excluirParametrosDadosMonitorados: function (parametro) {
                return $http.put(AppSettings.apiEndpoint + 'DadoMonitorado/', parametro).then(function (response) {
                    return response.data;
                });
            },
            excluirValorParametroDadosMonitorados: function (id_valor_parametro) {
                return $http.delete(AppSettings.apiEndpoint + 'DadosMonitorados/' + id_valor_parametro).then(function (response) {
                    return response.data;
                });
            },
            buscarAlturaDadosMonitorados: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'Altura/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarAlturaDadosMonitorados: function (altura) {               
                return $http.post(AppSettings.apiEndpoint + 'Altura', altura).then(function (response) {
                    return response.data;
                });
            },
            excluirAlturaDadosMonitorados: function (id_parametro) {
                return $http.delete(AppSettings.apiEndpoint + 'Altura/' + id_parametro).then(function (response) {
                    return response.data;
                });
            },
            buscarPesoDadosMonitorados: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'Peso/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarPesoDadosMonitorados: function (peso) {
                return $http.post(AppSettings.apiEndpoint + 'Peso', peso).then(function (response) {
                    return response.data;
                });
            },
             excluirPesoDadosMonitorados: function (id_parametro) {
                return $http.delete(AppSettings.apiEndpoint + 'Peso/' + id_parametro).then(function (response) {
                    return response.data;
                });
             },
              buscarPressaoArterialDadosMonitorados: function (id_usuario) {
                  return $http.get(AppSettings.apiEndpoint + 'PressaoArterial/' + id_usuario).then(function (response) {
                     return response.data;
                 });
             },
             salvarPressaoArterialDadosMonitorados: function (presaoArterial) {
                 return $http.post(AppSettings.apiEndpoint + 'PressaoArterial', presaoArterial).then(function (response) {
                     return response.data;
                 });
             },
             excluirPressaoArterialDadosMonitorados: function (id_parametro) {
                 return $http.delete(AppSettings.apiEndpoint + 'PressaoArterial/' + id_parametro).then(function (response) {
                     return response.data;
                 });
             }


        };
    });
