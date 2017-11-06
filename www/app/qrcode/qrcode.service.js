angular.module('app_hospitais.qrcode')

  .service('QrcodeService', function ($q, $http) {
    var self = {
      carregando: false,
      notificacoes: [],
      buscarNotificacoes: function () {
        var deferred = $q.defer();

        self.carregando = true; //Teste commit
        self.notificacoes.splice(0, self.notificacoes.length);

        //$http.get(AppSettings.baseApiUrl + '/buscarNotificacoesmedicas').then(function(response){
        $http.get(AppSettings.apiEndpoint + '/Notificacoes').then(function (response) {
          self.carregando = false;

          angular.forEach(response.data, function (especialidade) {
            self.notificacoes.push(especialidade);
          })

          deferred.resolve(self.notificacoes);
        }, function (error) {
          self.carregando = false;
          deferred.reject(error);
        });

        return deferred.promise;
       
      },
    

      buscarSenhaAtendimento: function () {
        var deferred = $q.defer();

        self.carregando = true;
        self.notificacoes.splice(0, self.notificacoes.length);
        
        $http.get(AppSettings.apiEndpoint + '/buscarSenhaAtendimento').then(function (response) {
          self.carregando = false;
        })
    }
  }
  return self;
  });
