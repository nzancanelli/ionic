angular.module('app_hospitais.shared')
.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, $cordovaToast, $ionicPlatform, $q){
 
  function showOfflineToast(){
      $cordovaToast.showLongBottom('Você está offline. Algumas funcionalidades podem não funcionar corretamente.').then(function (success) {
          // success
      }, function (error) {
          // error
      });
  }
    
  return {
    isOnline: function(){
      var d = $q.defer();

      $ionicPlatform.ready(function() {
        if(ionic.Platform.isWebView()){
          d.resolve($cordovaNetwork.isOnline());    
        } else {
          d.resolve(navigator.onLine);
        }
      });      

      return d.promise;
    },
    isOffline: function(){
      var d = $q.defer();

      $ionicPlatform.ready(function() {
        if(ionic.Platform.isWebView()){
          d.resolve(!$cordovaNetwork.isOnline());    
        } else {
          d.resolve(!navigator.onLine);
        }
      });      

      return d.promise;
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
          $ionicPlatform.ready(function() {
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){            
              console.log("went online");
            });
   
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              showOfflineToast();  
              console.log("went offline");
            });
          }); 
        }
        else { 
          window.addEventListener("online", function(e) {            
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            showOfflineToast();
            console.log("went offline");
          }, false);  
        }       
    }
  }
})