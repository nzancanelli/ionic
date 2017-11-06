angular.module('app_hospitais',
    [
      'ionic', 'ngCordova', 'app_hospitais.shared', 'app_hospitais.especialidades', 'app_hospitais.hospitais',
      'app_hospitais.minhasaude', 'app_hospitais.alergias', 'app_hospitais.dados-monitorados', 'app_hospitais.habitos',
      'relativeDate',
      'app_hospitais.historico-doencas', 'app_hospitais.cirurgias_realizadas', 'app_hospitais.antecedentes_pessoais',
      'app_hospitais.antecedentes_familiares', 'app_hospitais.necessidades-especiais', 'app_hospitais.medicamentos',
      'app_hospitais.cadastro-medicamentos', 'chart.js', 'ionic-datepicker', 'app_hospitais.menu',
      'app_hospitais.principal', 'app_hospitais.esquecisenha',
      'app_hospitais.cadastrar', 'app_hospitais.alterarsenha', 'app_hospitais.pacientes',
      'app_hospitais.historico-medicamento', 'app_hospitais.alarme-medicamento',
      'app_hospitais.notificacoes', 'app_hospitais.gps', 'app_hospitais.senha-atendimento'
    ])
  .constant('Config',
    {
      //SERVICE_URL: 'http://esbservicos-dsv.amil.com.br:7080/v1/rest/apphospitais'
      SERVICE_URL: 'https://api.amil.com.br/v1/rest/apphospitais'
      //SERVICE_URL: 'https://api-hom.amil.com.br/v1/rest/apphospitais'
    })
  .run(function($ionicPlatform, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
      if (ionic.Platform.isWebView())
        $cordovaSplashscreen.hide();

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .directive('positionBarsAndContent',
    function() {

      return {
        restrict: 'AC',

        link: function(scope, element) {

          var offsetTop = 0;

          // Get the parent node of the ion-content
          var parent = angular.element(element[0].parentNode);

          // Get all the headers in this parent
          var headers = parent[0].getElementsByClassName('bar');

          // Iterate through all the headers
          for (var i = 0; i < headers.length; i++) {
            // If this is not the main header or nav-bar, adjust its position to be below the previous header
            if (i > 0) {
              headers[i].style.top = offsetTop + 'px';
            }

            // Add up the heights of all the header bars
            offsetTop = offsetTop + headers[i].offsetHeight;
          }

          // Position the ion-content element directly below all the headers
          element[0].style.top = offsetTop + 'px';

        }
      };
    })
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $stateProvider
      .state('app',
        {
          url: '/app',
          templateUrl: 'app/shared/main.html',
          controller: 'AppController'
        });

    $urlRouterProvider.otherwise('app');

    Number.prototype.toRad = function() { return this * (Math.PI / 180); };
  });

function onLoad() {
  // Wait for device API libraries to load
  console.log('onDeviceReady function');

  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
    document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    onDeviceReady();
  }
}

// device APIs are available
//
function onDeviceReady() {
  console.log('onDeviceReady event');
  document.addEventListener('pause', onPause, false);
  document.addEventListener('resume', onResume, false);
  document.addEventListener('menubutton', onMenuKeyDown, false);

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onPause() {
  // Handle the pause event
  console.log('onPause event');
}

function onResume() {
  // Handle the resume event
  console.log('onResume event');
}

function onMenuKeyDown() {
  // Handle the menubutton event
  console.log('onMenuKeyDown event');
}

// onSuccess Geolocation
function onSuccess(position) {
  console.log('in onSuccess()');
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  console.log(
  'Latitude: ' + position.coords.latitude + '\n' +
    'Longitude: ' + position.coords.longitude + '\n' +
    'Altitude: ' + position.coords.altitude + '\n' +
    'Accuracy: ' + position.coords.accuracy + '\n' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    'Heading: ' + position.coords.heading + '\n' +
    'Speed: ' + position.coords.speed + '\n' +
    'Timestamp: ' + position.timestamp + '\n');
}

// onError Callback receives a PositionError object
function onError(error) {
  console.log('in onError()');
  console.log(error.code);
  console.log(error.message);
  alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
}
