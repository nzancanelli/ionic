angular.module('app_hospitais.shared')
  .service('NavigationService', ['$q', function ($q) {
    'use strict';

    var navigationService = {};
    navigationService.navigate = function (destination, options) {
      var q = $q.defer(),
        isRealDevice = ionic.Platform.isWebView();

      if (!isRealDevice) {
        q.reject('Esta funcionalidade é nativa do aparelho e não pode ser usada no Navegador.');
      } else {
        try {
          var successFn = options.successCallBack || function () {
          };
          successFn = function () {
            successFn();
            q.resolve();
          };

          var errorFn = options.errorCallback || function () {
          };
          errorFn = function (err) {
            errorFn(err);
            q.reject(err);
          };

          options.successCallBack = successFn;
          options.errorCallback = errorFn;

          //launchnavigator.navigate("London, UK");
          launchnavigator.navigate(destination, options);
        } catch (e) {
          q.reject('Exception: ' + e.message);
        }
      }
      return q.promise;
    };

    return navigationService;
  }])

