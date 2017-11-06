angular.module('app_hospitais.pacientes')

.service('PacientesService', function ($q, $http, $stateParams) {

      
var self = {

             
        carregando: false,        
 
        id_usuario: [],

        pacientes: [],
        pacienteSelecionado: [],

        filtroPacientes: [],

        convenios: [],

        elegivel: false,

        paciente: [],

        obterPacientes: function (id_usuario) {
            
            var deferred = $q.defer();
            
            self.carregando = true;
            self.pacientes.splice(0, self.pacientes.length);

            $http.get(AppSettings.apiEndpoint + 'pacientes/' + id_usuario).then(function(response){ 
                              
                self.carregando = false;
                
                angular.forEach(response.data, function (paciente) {
                    self.pacientes.push(paciente);
                })    

                deferred.resolve(self.pacientes);
            }, function(error){
                self.carregando = false;
                deferred.reject(error);
            });

            return deferred.promise;
            
        },

        obterPaciente: function (id_paciente) {
            var deferred = $q.defer();
            self.carregando = true;
            $http.get(AppSettings.apiEndpoint + 'paciente/' + id_paciente).then(function(response){    
                           
                self.carregando = false;
                self.paciente = response.data;
                deferred.resolve(self.paciente);
            }, function(error){
                self.carregando = false;
                deferred.reject(error);
            });
            return deferred.promise;
        },
        
        obterConvenios: function() {
            var deferred = $q.defer();
            self.carregando = true;
            $http.get(AppSettings.apiEndpoint + 'convenio/').then(function(response){                
                self.carregando = false;
                self.convenios = response.data;
                deferred.resolve(self.convenios);
            }, function(error){
                self.carregando = false;
                deferred.reject(error);
            });
            return deferred.promise;
        },
        
        salvarPaciente : function (pacienteObj)
        {
            return $http.post(AppSettings.apiEndpoint + "paciente/", pacienteObj).then(function(response){
            });

        }, 
        
        editarPaciente : function (id, pacienteObj)
        {
            return $http.put(AppSettings.apiEndpoint + "paciente/" + id, pacienteObj).then(function(response){
            });

        }, 

        verificarMatricula: function(dados) {
            
            var deferred = $q.defer();
            $http.post(AppSettings.apiEndpoint + 'beneficiario', dados).then(function(response){                
                self.paciente = response.data;
                deferred.resolve(self.paciente);
            }, function(error){
              
                deferred.reject(error);
            });
            return deferred.promise;
        },

        verificarElegibilidade: function(dados) {
            
            var deferred = $q.defer();
            $http.get(AppSettings.apiEndpoint + 'VerificarElegibilidade/', dados).then(function(response){                
                self.elegivel = response.data;
                deferred.resolve(self.elegivel);
            }, function(error){
                self.carregando = false;
                deferred.reject(error);
            });
            return deferred.promise;
        },

         verificarPreTriagemValida: function(dados) {
            
            var deferred = $q.defer();
            $http.post(AppSettings.apiEndpoint + 'informacoesPreTriagemListar', dados).then(function(response){                
                self.paciente = response.data;
                deferred.resolve(self.paciente);
            }, function(error){
              
                deferred.reject(error);
            });
            return deferred.promise;
        },

         buscaSenhaPreTriagem: function(dados) {

             console.log("buscartriagem");
            
            var deferred = $q.defer();
            $http.post(AppSettings.apiEndpoint + 'buscaSenhaPreTriagem', dados).then(function(response){                
                self.paciente = response.data;
                deferred.resolve(self.paciente);
            }, function(error){
              
                deferred.reject(error);
            });
            return deferred.promise;
        },

         CancelarPretriagem: function(dados) {
            
            var deferred = $q.defer();
            $http.post(AppSettings.apiEndpoint + 'cancelarPretriagem', dados).then(function(response){                
                self.paciente = response.data;
                deferred.resolve(self.paciente);
            }, function(error){
              
                deferred.reject(error);
            });
            return deferred.promise;
        },




        deletarPaciente: function(pacienteId)
        {
            return $http.delete(AppSettings.apiEndpoint + "paciente/" + pacienteId).then(function(response){
            });
        },

        removerAcentos: function (strBusca) {
           var map = {
                'a' : 'á|à|ã|â|À|Á|Ã|Â',
                'e' : 'é|è|ê|É|È|Ê',
                'i' : 'í|ì|î',
                'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                'c' : 'ç|Ç',
                'n' : 'ñ|Ñ'
            };
            
            angular.forEach(map, function (pattern, newValue) {
                if(strBusca != undefined){
                strBusca = strBusca.replace(new RegExp(pattern, 'g'), newValue);
             }
            });

            return strBusca;
        },

        
    }

    return self;
    
});
