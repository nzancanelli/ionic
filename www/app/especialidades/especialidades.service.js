angular.module('app_hospitais.especialidades')

.service('EspecialidadesService', function ($q, $http) {
    var self = {
        carregando: false,

         especialidades: [],

        buscarEspecialidades: function () {
            var deferred = $q.defer();

            self.carregando = true;
            self.especialidades.splice(0, self.especialidades.length);

            //    $http.get(AppSettings.apiEndpoint + '/buscarespecialidadesmedicas').then(function(response){
                  $http.get(AppSettings.apiEndpoint + '/Especialidades').then(function(response){
                self.carregando = false;

        //  angular.forEach(response.data.buscarEspecialidadesMedicasResponseType.especialidadeMedica, function (especialidade) {
                    angular.forEach(response.data, function (especialidade) {
                    self.especialidades.push(especialidade);
                })

                deferred.resolve(self.especialidades);
            }, function(error){
                self.carregando = false;
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }

    return self;
});
