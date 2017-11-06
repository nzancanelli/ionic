angular.module('app_hospitais.esquecisenha')


    .service('EsquecisenhaService', function ($q, $http) {

             var self = {
        
                  result : {},  
                     
         
                 enviaremail: function (dadosUsuario) {
                    var deferred = $q.defer();
                           
                        // $http.post(AppSettings.apiEndpoint + 'ValidarLogin' , dadosUsuario).then(function (response) {
                        $http.post(AppSettings.loginEndpoint + 'EsqueciSenha', dadosUsuario).then(function(response){ 
                                                             
                            self.result = response.data;
         
                                 deferred.resolve(self.result);         
                         
                     }, function(error){
                        
                         deferred.reject(error);
                     });
                    
                         return deferred.promise;                
                    
                 }
             }
         
             return self;

        });
        
