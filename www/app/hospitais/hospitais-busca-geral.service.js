angular.module('app_hospitais.hospitais')

.service('HospitaisBuscaGeralService', function ($q, $http, $cordovaGeolocation) {
 
function buscarHospitaisResultHandler(response) {
    console.log('Passo 3: buscarHospitaisResultHandler geral')
        var deferred = $q.defer();

        self.carregando = false;
        
        if (response.data == "") {
            deferred.reject({
                title: 'Atenção',
                message: 'Não foram encontrados hospitais próximos com a especialidade solicitada'
            });

            return;
        }

        if (response.data.hasOwnProperty('Fault')) {
            deferred.reject({
                title: 'Erro',
                message: response.data.Fault.detail.ErroInesperado.mensagemErro
            });

            return;
        }

     //   angular.forEach(response.data.buscarHospitaisResponseType.localAtendimento, function (localAtendimento) {
           angular.forEach(response.data, function (localAtendimento) {              
            self.hospitais_geral.push(localAtendimento);
           
        });

        console.log('Passo 3: self.hospitais_geral ' + self.hospitais_geral)
    
        deferred.resolve(self.hospitais_geral);        
       
        return deferred.promise;
    };

    function buscarHospitaisPorCoordenadasResultHandler(response) {
        var deferred = $q.defer();

        self.carregando = false;
        
        if (response.data == "") {
            deferred.reject({
                title: 'Atenção',
                message: 'Não foram encontrados hospitais próximos com a especialidade solicitada'
            });

            return;
        }

        if (response.data.hasOwnProperty('Fault')) {
            deferred.reject({
                title: 'Erro',
                message: response.data.Fault.detail.ErroInesperado.mensagemErro
            });

            return;
        }

        angular.forEach(response.data.buscarHospitaisResponseType.localAtendimento, function (localAtendimento) {
            console.log('self.filtroHospitais_geral.push(localAtendimento)')
            self.filtroHospitais_geral.push(localAtendimento);
        });
        
        deferred.resolve(self.filtroHospitais_geral);

        return deferred.promise;
    };

    function buscarHospitaisFaultHandler(error) {
        var deferred = $q.defer();
        self.carregando = false;

        deferred.reject({
            title: 'Atenção',
            message: 'Falha na comunicação com o servidor'
        });

        return deferred.promise;
    };

    var self = {
        carregando: false,

        hospitais_geral: [],

        coordenadas: {},

        filtroHospitais_geral: [],

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

        buscarHospital: function (idHospital) {
            var deferred = $q.defer();
            var r = self.hospitais_geral.concat(self.filtroHospitais_geral);

            for (var i = 0; i < r.length; i++) {
                if (r[i].identificador == idHospital) {
                    deferred.resolve(r[i]);

                    angular.forEach(r[i].foto, function (foto) {
                     //   $http.get(AppSettings.apiEndpoint + '/buscarfotos?identificador=' + foto.identificador).then(function (response) {
                      $http.get(AppSettings.apiEndpoint + 'UnidadeImagens/' + foto.identificador).then(function (response) {    
                         //   foto.foto = response.data.buscarFotoResponseType.foto;
                            foto.foto = response.data;
                        });
                    });

                    break;
                }
            }

            return deferred.promise;
        },

        buscarHospitaisPorCoordenadas: function (especialidade, coordenadas) {
            console.log('buscarHospitaisPorCoordenadas')
            var url = '/buscarhospitais?identificadorEspecialidadeMedica=' + especialidade + "&latitude=" + coordenadas.latitude + "&longitude=" + coordenadas.longitude;

            self.carregando = true;
            self.filtroHospitais_geral.splice(0, self.filtroHospitais_geral.length);

            return $http.get(AppSettings.apiEndpoint + url).then(buscarHospitaisPorCoordenadasResultHandler, buscarHospitaisFaultHandler);
        },

        buscarHospitais: function () {  
            console.log('Passo 2: entrou no serviço buscarHospitais geral')       
            var url = 'Unidade/';
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false,
                maximumAge: 300000
            };

            self.carregando = true;
            self.hospitais_geral.splice(0, self.hospitais_geral.length);

            return $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {            
                   coordenadas = {
                    latitude: position.coords.latitude,
                    latitudeSpecified: true,
                    longitude: position.coords.longitude,
                    longitudeSpecified:true

                }
            }, function (err) {
                console.log(err);
            }).then(function () {
                              
              return $http.post(AppSettings.apiEndpoint + url, coordenadas ).then(buscarHospitaisResultHandler, buscarHospitaisFaultHandler);
   
            });
        },

        templateMarca: function (hospital) {
            var t = '<div ng-click="detalharHospital(' + hospital.identificador + ')" class="maker-custom">' +
                '<strong>' + hospital.nome + '</strong><br><i class="ion-ios-clock-outline"></i>  ';

            t += hospital.tempoEspera != 0 ? hospital.tempoEspera + ' minutos espera <br>' : 'Espera indisponível<br>';

            t += '<i class="ion-ios-telephone"></i>  (' + hospital.telefone[0].DDD + ') ' + hospital.telefone[0].numeroTelefone + '<br>' +
                '<i class="ion-ios-location-outline"></i>  ' + hospital.endereco.logradouro + ' ' + hospital.endereco.numero + '<br>' +
                hospital.endereco.bairro + ' ' + hospital.endereco.cidade + ' ' + hospital.endereco.estado + '<br>';

            t += hospital.distancia != undefined ? '<span> Você está a ' + hospital.distancia + ' km </span></div>' : '<span>Distância indisponível</span></div>';

            return t;
        }
    };

    return self;
});
