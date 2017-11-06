angular.module('app_hospitais.dados-monitorados')

    .service('GraficosDadosMonitoradosService', function ($q, $http) {

        return {
            buscarGraficoPorAno: function (dadosGrafico) {
                return $http.post(AppSettings.apiEndpoint + 'DadoMonitoradoGraficoPorAno', dadosGrafico).then(function (response) {
                    return response.data;
                });
            },
            buscarGraficoPorSemana: function (dadosGrafico) {
                console.log(dadosGrafico)
                return $http.get(AppSettings.apiEndpoint +
                    'DadoMonitoradoGraficoPorSemana?IdUsuario=' + dadosGrafico.IdUsuario +
                    '&IdParametro=' + dadosGrafico.IdParametro).then(function (response) {
                        return response.data;
                    });
            },
            buscarGraficoPorMes: function (id_usuario, idParam) {
                console.log(id_usuario + ' ' + idParam)
                return $http.get(AppSettings.apiEndpoint + 'DadoMonitoradoGraficoPorMes?IdUsuario=' + id_usuario +
                    '&IdParametro=' + idParam).then(function (response) {
                        return response.data;
                    });
            }
        };
    });
