angular.module('app_hospitais.dados-monitorados')

    .controller('DadosMonitoradosController', function ($scope, $state, DadosMonitoradosService, $ionicPopup, $filter, $rootScope) {
        $scope.dadosFixos = {};
        $scope.IMC = {};

        DadosMonitoradosService.buscarPesoDadosMonitorados($rootScope.id).then(function (dados) {
            if (dados.length > 0) {
                var dadoOrdenado = $filter('orderBy')(dados, '-DataCriacao');
                $scope.dadosFixos.peso = dadoOrdenado[0].Valor;
            }
            else {
                $scope.dadosFixos.peso = 0;
            }
            //var dadoOrdenado = $filter('orderBy')(dados, '-DataCriacao');
            //$scope.dadosFixos.peso = dadoOrdenado[0].Valor;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        DadosMonitoradosService.buscarPressaoArterialDadosMonitorados($rootScope.id).then(function (dados) {

            if (dados.length > 0) {
                var dadoOrdenado = $filter('orderBy')(dados, '-DataCriacao');
                $scope.dadosFixos.PressaoValorSistolica = dadoOrdenado[0].ValorSistolica;
                $scope.dadosFixos.PressaoValorDiastolica = dadoOrdenado[0].ValorDiastolica;
            }
            else {
                $scope.dadosFixos.PressaoValorSistolica = 0;
                $scope.dadosFixos.PressaoValorDiastolica = 0;
            }            //var dadoOrdenado = $filter('orderBy')(dados, '-DataCriacao');
            //$scope.dadosFixos.peso = dadoOrdenado[0].Valor;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });


        //TODO: alterar o id do usuario
        DadosMonitoradosService.buscarAlturaDadosMonitorados($rootScope.id).then(function (dados) {
            if (dados.length > 0) {
                var dadoOrdenado = $filter('orderBy')(dados, '-DataCriacao');
                $scope.dadosFixos.altura = dadoOrdenado[0].Valor;


                //converter para inteiro se for decimal              
                if (Number($scope.dadosFixos.altura) % 1 != 0) {
                    $scope.dadosFixos.altura = $scope.dadosFixos.altura * 100;
                }

                //converter para cm se for metro
                $scope.dadosFixos.alturaIMC = $scope.dadosFixos.altura / 100;
            }
            else {
                $scope.dadosFixos.altura = 0;
            }

        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        //TODO: alterar o id do usuario - Desabilitado por hora
        /*
        DadosMonitoradosService.buscarParametrosDadosMonitorados($rootScope.id).then(function (dados) {
            $scope.parametros = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerParametro = function (IdParametro) {
            var parametro = {
                IdParametro: IdParametro
            }
            DadosMonitoradosService.excluirParametrosDadosMonitorados(parametro).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }*/

        $scope.calcularIMC = function () {
            $scope.IMC = {};
            if (($scope.dadosFixos.peso != null || $scope.dadosFixos.peso > 0) && ($scope.dadosFixos.altura != null || $scope.dadosFixos.altura > 0)) {
                $scope.IMC = $scope.dadosFixos.peso / ($scope.dadosFixos.alturaIMC * $scope.dadosFixos.alturaIMC);
            }
            return $scope.IMC;
        }

        $scope.textoIMC = function () {
            var valor = $scope.IMC;

            if (valor < 17) {
                return "Muito abaixo do peso";
            } else if (valor > 17 && valor <= 18.49) {
                return "Abaixo do peso";
            } else if (valor > 18.5 && valor <= 24.99) {
                return "Peso normal";
            } else if (valor > 25 && valor <= 29.99) {
                return "Acima do peso";
            } else if (valor > 30 && valor <= 34.99) {
                return "Obesidade I";
            } else if (valor > 35 && valor <= 39.99) {
                return "Obesidade II (severa)";
            } else if (valor > 40) {
                return "Obesidade III (mórbida)";
            }
        }
    })
    .controller('AdicionarParametroController', function ($scope, $state, DadosMonitoradosService, $ionicPopup, $rootScope) {

        $scope.parametro = {};

        $scope.adicionarParametro = function () {
            var parametro = {
                IdUsuario: $rootScope.id,
                DescricaoParametro: $scope.parametro.DescricaoParametro.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                UnidadeMedida: null
            }

            DadosMonitoradosService.salvarParametroDadosMonitorados(parametro).then(function (dados) {
                $state.go('menu.dados-monitorados');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        $scope.cancelarParametro = function () {
            $scope.parametro = {};
            $state.go('menu.dados-monitorados');
        }

    })
    .controller('HistoricoDadosMonitoradosController', function
     ($scope, $state, $filter, $ionicPlatform, DadosMonitoradosService, $ionicPopup, GraficosDadosMonitoradosService, $http, $rootScope) {


        var param = $state.params.ID_PARAMETRO;
        $scope.data = [];
        $scope.labels = [];


        //busca dados historico
        if (param == 'PESO') {
            //TODO: alterar o id do usuario
            DadosMonitoradosService.buscarPesoDadosMonitorados($rootScope.id).then(function (dados) {
                $scope.valoresParametro = {
                    IdParametro: 'PESO',
                    DescricaoParametro: 'Peso',
                    Valores: dados
                };
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }
        else if (param == 'ALTURA') {
            //TODO: alterar o id do usuario
            DadosMonitoradosService.buscarAlturaDadosMonitorados($rootScope.id).then(function (dados) {
                $scope.valoresParametro = {
                    IdParametro: 'ALTURA',
                    DescricaoParametro: 'Altura',
                    Valores: dados
                };
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }
        else {
            //TODO: alterar o id do usuario
            DadosMonitoradosService.buscarValoresParametrosDadosMonitorados($rootScope.id, param).then(function (dados) {
                $scope.valoresParametro = dados[0];
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        //Graficos     
        setAlturaGraficoSemDados = function () {
            var grafico = angular.element(document.querySelector('.conteudoFixo'));
            var conteudo = angular.element(document.querySelector('.conteudoNormal'));
            var alturaHeader = grafico[0].offsetHeight;
            //console.log('sem ' + alturaHeader)
            conteudo.css('top', (alturaHeader + 43) + 'px');
        }

        setAlturaGraficoComDados = function () {
            var grafico = angular.element(document.querySelector('.conteudoFixo'));
            var conteudo = angular.element(document.querySelector('.conteudoNormal'));
            var alturaHeader = grafico[0].offsetHeight;
            //console.log('com ' + alturaHeader)
            conteudo.css('top', (alturaHeader + 240) + 'px');
            //console.log(conteudo)
        }

        setAltura = function () {
            //console.log($scope.data.length)
            if ($scope.data.length <= 0)
                setAlturaGraficoSemDados();
            else
                setAlturaGraficoComDados();
        }

        GraficoPorPeriodo = function () {
            if (param == 'PESO') {
                $scope.labels = [];
                $scope.data = [];
            }
            else if (param == 'ALTURA') {
                $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40]

                ];

            } else {
                GraficosDadosMonitoradosService.buscarGraficoPorAno(1, param).then(function (dados) {
                    //console.log('dados')
                    //console.log(dados)
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });

                $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40]

                ];
            }
        };

        GraficoPorDias = function () {
            if (param == 'PESO') {
                $scope.labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '06:00', '08:00', '09:00', '10:00', '11:00'
                    , '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
                $scope.data = [
                    [60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62]

                ];
            }
            else if (param == 'ALTURA') {
                $scope.labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '06:00', '08:00', '09:00', '10:00', '11:00'
                    , '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
                $scope.data = [
                    [60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62]

                ];
            } else {
                GraficosDadosMonitoradosService.buscarGraficoPorAno(1, param).then(function (dados) {
                    //console.log('dados')
                    //console.log(dados)
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });

                $scope.labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '06:00', '08:00', '09:00', '10:00', '11:00'
                    , '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
                $scope.data = [
                    [60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62, 60, 60.5, 61, 62]

                ];
            }
        };

        GraficoPorSemana = function () {
            if (param == 'PESO') {
            }
            else if (param == 'ALTURA') {
                $scope.labels = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
                $scope.data = [
                    [60.5, 61, 62, 60, 65, 63, 67]

                ];
            } else {

                var paramDadosGrafico = {
                    IdUsuario: 1,
                    IdParametro: 23
                };

                GraficosDadosMonitoradosService.buscarGraficoPorSemana(paramDadosGrafico).then(function (dados) {

                    new Chart(document.getElementById("bar-chart"), {
                        type: 'bar',
                        data: {
                            labels: dados.m_Item1,
                            datasets: [
                                {
                                    backgroundColor: "#c2df7e",
                                    borderColor: "#84BD00",
                                    borderWidth: 1,
                                    data: dados.m_Item2
                                }
                            ]
                        },
                        options: {
                            legend: { display: false }
                        }
                    });
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });

            }
        }


        GraficoPorMes = function () {
            if (param == 'PESO') {
                $scope.labels = ['04/08/2017', '05/08/2017', '14/08/2017', '20/08/2017'];
                $scope.data = [
                    [60.5, 61, 62, 60]

                ];
            }
            else if (param == 'ALTURA') {
                $scope.labels = ['04/08/2017', '05/08/2017', '14/08/2017', '20/08/2017'];
                $scope.data = [
                    [60.5, 61, 62, 60]

                ];
            } else {
                //todo: alterar parametros
                GraficosDadosMonitoradosService.buscarGraficoPorMes(1, 23).then(function (dados) {
                    new Chart(document.getElementById("bar-chart"), {
                        type: 'bar',
                        data: {
                            labels: dados.m_Item1,
                            datasets: [
                                {
                                    backgroundColor: "#c2df7e",
                                    borderColor: "#b4d074",
                                    borderWidth: 1,
                                    data: dados.m_Item2
                                }
                            ]
                        },
                        options: {
                            legend: { display: false }
                        }
                    });
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });

                $scope.labels = ['04/08/2017', '05/08/2017', '14/08/2017', '20/08/2017'];
                $scope.data = [
                    [60.5, 61, 62, 60]

                ];
            }
        };

        GraficoPorAno = function () {
            if (param == 'PESO') {
                $scope.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']; $scope.series = ['Series A'];

                $scope.data = [
                    [60.5, 61, 62, 60, 59, 59.8, 61, 62, 63, 58, 59, 60, 61]

                ];
            }
            else if (param == 'ALTURA') {
                $scope.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']; $scope.series = ['Series A'];

                $scope.data = [
                    [60.5, 61, 62, 60, 59, 59.8, 61, 62, 63, 58, 59, 60, 61]

                ];
            } else {

                var paramDadosGrafico = {
                    IdUsuario: 1,
                    IdParametro: 23
                };

                GraficosDadosMonitoradosService.buscarGraficoPorAno(paramDadosGrafico).then(function (dados) {
                    new Chart(document.getElementById("bar-chart"), {
                        type: 'bar',
                        data: {
                            labels: dados.m_Item1,
                            datasets: [
                                {
                                    backgroundColor: "#c2df7e",
                                    borderColor: "#84BD00",
                                    borderWidth: 1,
                                    data: dados.m_Item2
                                }
                            ]
                        },
                        options: {
                            legend: { display: false }
                        }
                    });

                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }
        };


        $scope.mudarFiltro = function (ordenacao) {
            $scope.predicado = ordenacao;

            if ($scope.predicado == 'periodo') {
                GraficoPorPeriodo();
            } else if ($scope.predicado == 'dia') {
                GraficoPorDias();
            } else if ($scope.predicado == 'semana') {
                GraficoPorSemana();
            } else if ($scope.predicado == 'mes') {
                GraficoPorMes();
            } else if ($scope.predicado == 'ano') {
                GraficoPorAno();
            }
            setAltura();
        }

        // tipo de ordenação inicial
        $scope.predicado = 'periodo';
        GraficoPorPeriodo();
        setAltura();



        $scope.removerValores = function (id) {
            if (param == 'PESO') {
                DadosMonitoradosService.excluirPesoDadosMonitorados(id).then(function (dados) {
                    $state.go($state.current, {}, { reload: true })
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });

            }
            else if (param == 'ALTURA') {
                DadosMonitoradosService.excluirAlturaDadosMonitorados(id).then(function (dados) {
                    $state.go($state.current, {}, { reload: true })
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }
            else {

                DadosMonitoradosService.excluirValorParametroDadosMonitorados(id).then(function (dados) {
                    $state.go($state.current, {}, { reload: true })
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }
        }

    })
    .controller('ValorDadosMonitoradosController', function ($scope, $state, $filter, ionicDatePicker, DadosMonitoradosService, $ionicPopup, $rootScope) {
        $scope.valor = {};
        var id_param = $state.params.ID_PARAMETRO;


        $scope.abrirPopupCalendario = function () {
            var configuracoes = {
                callback: function (data) {
                    $scope.valor.DT_CRIACAO = $filter('date')(new Date(data), 'dd/MM/yyyy');
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd-MM-yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            }
            ionicDatePicker.openDatePicker(configuracoes)
        }

        $scope.cancelarValor = function () {
            $state.go('menu.historico', { ID_PARAMETRO: param });
        }

        $scope.adicionarValor = function () {
            if (id_param == "PESO") {
                var pesoParam = {
                    IdUsuario: $rootScope.id,
                    Valor: Number($scope.valor.VALOR),
                    DataCriacao: $scope.valor.DT_CRIACAO
                }

                DadosMonitoradosService.salvarPesoDadosMonitorados(pesoParam).then(function (dados) {
                    $state.go('menu.historico', { ID_PARAMETRO: 'PESO' });
                }, function (erro) {

                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }
            else if (id_param == "ALTURA") {
                var alturaParam = {
                    IdUsuario: $rootScope.id,
                    Valor: Number($scope.valor.VALOR),
                    DataCriacao: $scope.valor.DT_CRIACAO
                }

                DadosMonitoradosService.salvarAlturaDadosMonitorados(alturaParam).then(function (dados) {
                    $state.go('menu.historico', { ID_PARAMETRO: 'ALTURA' });
                }, function (erro) {

                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }
            else {
                var valorParametro = {
                    IdParametro: Number(id_param),
                    Valor: Number($scope.valor.VALOR),
                    DataCriacao: $scope.valor.DT_CRIACAO
                }

                DadosMonitoradosService.salvarParametroDadosMonitorados(valorParametro).then(function (dados) {
                    $state.go('menu.historico', { ID_PARAMETRO: valorParametro.IdParametro });
                }, function (erro) {

                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                });
            }

        }
    })
    .controller('PeriodoDadosMonitoradosController', function ($scope, $state, $filter, ionicDatePicker) {
        $scope.periodo = {};
        var param = $state.params.ID_PARAMETRO;

        $scope.abrirPopupCalendarioDe = function () {

            var configuracoes = {
                callback: function (data) {
                    $scope.periodo.de = $filter('date')(new Date(data), 'dd/MM/yyyy');
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd-MM-yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            }
            ionicDatePicker.openDatePicker(configuracoes)
        }
        $scope.abrirPopupCalendarioAte = function () {

            var configuracoes = {
                callback: function (data) {
                    $scope.periodo.ate = $filter('date')(new Date(data), 'dd/MM/yyyy');
                },
                setLabel: 'Selecionar',
                closeLabel: 'Cancelar',
                dateFormat: 'dd-MM-yyyy',
                weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                monthsList: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

            }
            ionicDatePicker.openDatePicker(configuracoes)
        }


        $scope.cancelarPeriodo = function () {
            $scope.periodo = {};
            $state.go('menu.historico', { ID_PARAMETRO: param });
        }

        $scope.adicionarPeriodo = function () {

            $state.go('menu.historico', { ID_PARAMETRO: param });
        }
    })
    .directive('setHeight', function ($timeout) {
        return function (scope, element, attrs) {

            var grafico = angular.element(document.querySelector('.conteudoFixo'));
            var alturaHeader = grafico[0].offsetHeight;
            //console.log(alturaHeader)
            element.css('top', (alturaHeader + 43) + 'px');


        }
    });
