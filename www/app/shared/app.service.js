(function () {
  'use strict';
  angular
    .module('app_hospitais.shared')
    .service('AppService', appService);

  appService().$inject = ['$q', '$http', 'connectivityMonitor'];

  function appService($q, $http/*, connectivityMonitor*/) {
    var configuracao = [];
    var result = {};

    var service = {
      buscarConfiguracao: buscarConfiguracao,
      buscarInformacaoAplicativo: buscarInformacaoAplicativo,
      autenticar: autenticar,
      UsuarioLocal: usuarioLocal,
      transformarDataParaRelativa: transformarDataParaRelativa,
      transformarRelativaParaData: transformarRelativaParaData,
      configuracao: configuracao,
      result: result

      //estaDisponivel: true
    };
    return service;

    function buscarConfiguracao() {
      var deferred = $q.defer();

      //commented
      //connectivityMonitor.isOnline().then(function (isOnline) {
      //  if (isOnline) {
      //    $http.get(AppSettings.apiEndpoint + '/buscarconfiguracao').then(function (response) {
      //      configuracao = response.data.buscarConfiguracaoResponseType.configuracao;

      //      deferred.resolve(configuracao);
      //    },
      //      function (error) {
      //        deferred.reject(error);
      //      });
      //  } else {
      //    deferred.reject();
      //  }
      //});

      //commented
      $http.get(AppSettings.apiEndpoint + '/buscarconfiguracao').then(function (response) {
        //configuracao = response.data.buscarConfiguracaoResponseType.configuracao;
        configuracao = response.data;

        deferred.resolve(configuracao);
      },
        function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function buscarInformacaoAplicativo(os) {
      for (var i = 0; i < configuracao.aplicativo.length; i++) {
        if (configuracao.aplicativo[i].sistema.toLowerCase() === os.toLowerCase()) {
          return configuracao.aplicativo[i];
        }
      }
      return null;
    }

    function autenticar(dadoslogin) {
      var deferred = $q.defer();

      $http.get(AppSettings.identityEndpoint + 'identity?Email=' + dadoslogin.Email).then(function (response1) {
        console.log('identity: ' + response1.data);
        dadoslogin.Token = response1.data;
        //deferred.resolve(response);

        $http.post(AppSettings.loginEndpoint + 'ValidarLogin', dadoslogin).then(function (response) {
          console.log('ValidarLogin: ' + response.data);
          result = response.data;
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
          });


      }, function (error) {
        deferred.reject(error);
      });



      return deferred.promise;
    }

    function usuarioLocal(response, url) {
      var deferred = $q.defer();

      $http.get(AppSettings.apiEndpoint + url + response.Id).then(function (result) {
        response.Id = result.data.Id;
        console.log('Aqui é ' + result.data.Id);
        result = result.data;
        deferred.resolve(result);

      });

      return deferred.promise;
    }

    function transformarDataParaRelativa(tempoData, valorData) {
      var dtHoje = new Date();

      switch (tempoData) {
        case 'dias':
          dtHoje.setDate(dtHoje.getDate() - valorData);
          break;
        case 'semanas':
          dtHoje.setDate(dtHoje.getDate() - (valorData * 7));
          break;
        case 'meses':
          dtHoje.setMonth(dtHoje.getMonth() - valorData);
          break;
        case 'anos':
          dtHoje.setMonth(dtHoje.getMonth() - (valorData * 12));
          break;
        default:
          return '';
      }
      return dtHoje;
    }

    function transformarRelativaParaData(dataFormatada) {
      var array = dataFormatada.split(' ');
      var retorno = {};

      //numero
      if (array[0].indexOf('um') !== -1 || array[0].indexOf('uma') !== -1) {
        retorno.valorData = 1;
      }
      else {
        retorno.valorData = Number(array[0]);
      }
      //texto
      if (array[1].indexOf('dia') !== -1) {
        retorno.tempoData = 'dias';
      }
      else if (array[1].indexOf('semana') !== -1) {
        retorno.tempoData = 'semanas';
      }
      else if (array[1].indexOf('mês') !== -1) {
        retorno.tempoData = 'meses';
      }
      else if (array[1].indexOf('meses') !== -1) {

        retorno.tempoData = 'meses';
      }
      else if (array[1].indexOf('ano') !== -1) {
        retorno.tempoData = 'anos';
      }

      return retorno;
    }
  }
})();
