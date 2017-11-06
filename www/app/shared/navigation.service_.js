angular.module('app_hospitais.shared')
    .service('NavigationService', function ($q, $timeout, $cordovaAppAvailability, $cordovaInAppBrowser, $ionicActionSheet, $ionicPopup) {
        var destinationLatitude;
        var destinationLongitude;

        var checkApps = function (app) {
            var d = $q.defer();

            var scheme = device.platform === 'iOS' ? app.iOSScheme : app.androidScheme;

            appAvailability.check(scheme, function () {
                d.resolve(app);
            }, function () {
                d.resolve();
            });

            return d.promise;
        };

        var self = {
            appsNavigation: [{
                    text: 'Waze',
                    androidScheme: 'com.waze',
                    iOSScheme: 'waze://',
                    link: function (lat, lng) {
                        return 'waze://?ll=' + destinationLatitude + ',' + destinationLongitude + '&navigate=yes';
                    }
                    },
                {
                    text: 'Google Maps',
                    androidScheme: 'com.google.android.apps.maps',
                    iOSScheme: 'http://maps.apple.com/',
                    link: function (lat, lng) {
                    if (device.platform == 'iOS') {
                    /*VERIFICAR VARIAVEIS*/
                    $ionicPopup.alert({
                      title: 'Atenção!',
                      template: "Latitude: "+lat+" Longitude: "+lng+" Scope:"+scope+" Device: "+device.platform+" IsWebView: "+ionic.Platform.isWebView()
                     });
                    /*********************/
                            //return 'http://maps.apple.com/?saddr=' + userLat + ',' + userlng + '&daddr=' + lat + ','+ lng;	
                            //return 'http://maps.apple.com/?daddr=' + destinationLatitude + ',' + destinationLongitude;
                        } else {
                            return 'google.navigation:q=' + destinationLatitude + ',' + destinationLongitude;
                        }
                    }
            }],

            check: function (apps) {
                var promises = [];

                angular.forEach(apps, function (item) {
                    promises.push(checkApps(item));
                });

                return $q.all(promises);
            },

            navigate: function (lat, lng, scope) {
             // $ionicPopup.alert({
             //                   title: 'Atenção!',
             //                   template: "Latitude: "+lat+" Longitude: "+lng+" Scope:"+scope+" Device: "+device.platform+" IsWebView: "+ionic.Platform.isWebView()
             //                   });
             
                if (ionic.Platform.isWebView()) {
                    window.open = cordova.InAppBrowser.open;
                    destinationLatitude = lat;
                    destinationLongitude = lng;

                    self.check(self.appsNavigation).then(function (response) {
                        var buttons = [];
                        var apps = [];

                        angular.forEach(response, function (item) {
                            if (item) {
                                apps.push(item);

                                var appName = item.text;

                                if (item.text == 'Google Maps' && device.platform == 'iOS') {
                                    appName = 'Maps';
                                }

                                buttons.push({
                                    text: appName
                                });
                            }
                        });

                        if (buttons.length > 0) {
                            scope.tap = function (index) {
                                window.open(apps[index].link(lat, lng), '_system', 'location=no');
                                return true;
                            }

                            
                            $ionicActionSheet.show({
                                buttons: buttons,
                                titleText: 'Navegar',
                                cancelText: 'Cancelar',
                                buttonClicked: scope.tap,
                                cancel: function(){
                                    return false;
                                }
                            });
                            
                        } else {
                            alert('Instale um aplicativo de navegação.');
                        }
                    });
                } else {
                    alert('Não e possível iniciar a navegação no browser.');
                }
            }
        };

        return self;
    });
