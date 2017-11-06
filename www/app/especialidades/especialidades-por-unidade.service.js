angular.module('app_hospitais.especialidades')

    .service('EspecialidadesPorUnidadeService', function ($q, $http) {
        var self = {
            carregando: false,

            especialidades: [],

            buscarEspecialidades: function (idHospital) {
                var deferred = $q.defer();

                self.carregando = true;
                self.especialidades.splice(0, self.especialidades.length);

                $http.get(AppSettings.apiEndpoint + 'Especialidades/' + idHospital).then(function (response) {
                    self.carregando = false;

                    angular.forEach(response.data, function (especialidade) {
                        self.especialidades.push(especialidade);
                    })

                    deferred.resolve(self.especialidades);
                }, function (error) {
                    self.carregando = false;
                    deferred.reject(error);
                });

         
                return deferred.promise;
            }
        }

        return self;
    });
