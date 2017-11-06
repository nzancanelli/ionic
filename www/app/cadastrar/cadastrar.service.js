angular.module('app_hospitais.cadastrar')



.service('CadastrarService', function ($q, $http) {    
    var self = {

         result : {},  
            

        gravar: function (dadosUsuario) {
           var deferred = $q.defer();   
         
         
           $http.post(AppSettings.loginEndpoint + 'cadastrarusuario', dadosUsuario).then(function(response){
                              
                   self.relsult = response.data;

                        deferred.resolve(self.relsult);         
               
            }, function(error){
               
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }

    return self;
});
