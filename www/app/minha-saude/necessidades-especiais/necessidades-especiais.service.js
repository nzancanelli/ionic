angular.module('app_hospitais.necessidades-especiais')

    .service('NecessidadeEspecialService', function ($q, $http) {

        return {
            buscarItensNecessidadesEspeciais: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'NecessidadesEspeciais/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            //buscarNecessidadesEspeciais: function (id_usuario) {
            //    return $http.get(AppSettings.apiEndpoint + 'ItensNecessidadesEspeciais/' + id_usuario).then(function (response) {
            //        return response.data;
            //    });
            //},
            salvarNecessidadesEspeciais: function (necessidades) {
                return $http.post(AppSettings.apiEndpoint + 'NecessidadesEspeciais', necessidades).then(function (response) {
                    return response.data;
                });
            }
        };
    });
