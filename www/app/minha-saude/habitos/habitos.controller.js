angular.module('app_hospitais.habitos')

    .controller('HabitoController', function ($scope, $state, HabitosService, $ionicPopup, $rootScope) {

        HabitosService.buscarHabitosTabagismo($rootScope.id).then(function (dados) {
            $scope.habitoTabagismo = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });


        //TODO: alterar o id do usuario
        HabitosService.buscarHabitosConsomeBebida($rootScope.id).then(function (dados) {
            $scope.habitoConsumoBebidas = dados;
            $scope.showHabitoConsumoBebidas = $scope.habitoConsumoBebidas != null;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });



        //TODO: alterar o id do usuario
        HabitosService.buscarHabitosAtivFisica($rootScope.id).then(function (dados) {
            $scope.habitoAtvFisica = dados;
            $scope.showHabitoAtvFisica = $scope.habitoAtvFisica != null;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerConsumoBebida = function (id) {
            HabitosService.excluirItemConsomeBebida(id).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        $scope.removerAtivFisica = function (id) {
            HabitosService.excluirItemHabitosAtivFisica(id).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

    })
    .controller('EditarHabitoBebidasController', function ($scope, $state, HabitosService, $ionicPopup, $rootScope) {

        $scope.habitoConsumoBebida = angular.fromJson($state.params.habito);
        //conversão consome bebida
        $scope.habitoConsumoBebida.ConsomeBebida = "true";

        $scope.adicionarConsumoBebida = function () {

            if ($scope.habitoConsumoBebida.ConsomeBebida == "true") {

                var parametrosItemConsomeBebida = {
                    Id: $scope.habitoConsumoBebida.Id,
                    IdHabitoBebida: $scope.habitoConsumoBebida.IdHabitoBebida,
                    DescricaoBebida: $scope.habitoConsumoBebida.DescricaoBebida != null ? $scope.habitoConsumoBebida.DescricaoBebida.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Frequencia: $scope.habitoConsumoBebida.Frequencia != null ? $scope.habitoConsumoBebida.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Ativo: true
                }

                HabitosService.editarItemConsomeBebida(parametrosItemConsomeBebida).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })
            }
            else {

                var parametrosConsumoBebida = {
                    Id: $scope.habitoConsumoBebida.IdHabitoBebida,
                    IdUsuario: $rootScope.id,
                    ConsomeBebida: $scope.habitoConsumoBebida.ConsomeBebida,
                    ItensBebidas: [{}]
                }

                HabitosService.editarHabitosConsomeBebida(parametrosConsumoBebida).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })

            }
        }

        $scope.atualizarCampos = function () {
            $scope.habitoConsumoBebida.DescricaoBebida = "";
            $scope.habitoConsumoBebida.Frequencia = "";
        }

        $scope.cancelarConsumoBebida = function () {
            $state.go('menu.habitos');
        }

    })

    .controller('AdicionarHabitoBebidasController', function ($scope, $state, HabitosService, $ionicPopup, $rootScope) {

        if ($state.params.habito) {
            $scope.habitoConsumoBebida = angular.fromJson($state.params.habito);
            $scope.habitoConsumoBebida.ConsomeBebida = $scope.habitoConsumoBebida.ConsomeBebida.toString();
        }
        else {
            $scope.habitoConsumoBebida = { Id: 0 };
        }

        $scope.adicionarConsumoBebida = function () {

            //primeira inserção 
            if ($scope.habitoConsumoBebida.Id == 0) {

                if ($scope.habitoConsumoBebida.ConsomeBebida == "true") {

                    var parametrosConsumoBebida = {
                        IdUsuario: $rootScope.id,
                        ConsomeBebida: $scope.habitoConsumoBebida.ConsomeBebida,
                        ItensBebidas: [{
                            DescricaoBebida: $scope.habitoConsumoBebida.DescricaoBebida != null ? $scope.habitoConsumoBebida.DescricaoBebida.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                            Frequencia: $scope.habitoConsumoBebida.Frequencia != null ? $scope.habitoConsumoBebida.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null
                        }]
                    }
                }
                else {
                    var parametrosConsumoBebida = {
                        IdUsuario: $rootScope.id,
                        ConsomeBebida: $scope.habitoConsumoBebida.ConsomeBebida,
                        ItensBebidas: null
                    }

                }

                HabitosService.salvarHabitosConsomeBebida(parametrosConsumoBebida).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })
            }
            else { //já existe consumo de bebida

                $scope.habitoConsumoBebida.ItensBebidas.push({
                    IdHabitoBebida: $scope.habitoConsumoBebida.Id,
                    DescricaoBebida: $scope.habitoConsumoBebida.DescricaoBebida != null ? $scope.habitoConsumoBebida.DescricaoBebida.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Frequencia: $scope.habitoConsumoBebida.Frequencia != null ? $scope.habitoConsumoBebida.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null
                })

                var parametrosConsumoBebida = {
                    Id: $scope.habitoConsumoBebida.Id,
                    IdUsuario: $scope.habitoConsumoBebida.IdUsuario,
                    ConsomeBebida: $scope.habitoConsumoBebida.ConsomeBebida,
                    ItensBebidas: $scope.habitoConsumoBebida.ItensBebidas
                }

                HabitosService.editarHabitosConsomeBebida(parametrosConsumoBebida).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })

            }

        }

        $scope.cancelarConsumoBebida = function () {
            $scope.habitoConsumoBebida = {};
            $state.go('menu.habitos');
        }
    })

    .controller('EditarHabitoAtivFisicaController', function ($scope, $state, HabitosService, $ionicPopup, $rootScope) {

        $scope.habitoAtvFisica = angular.fromJson($state.params.habito);

        //conversão pratica atividade
        $scope.habitoAtvFisica.RealizaAtividadeFisica = "true";

        $scope.adicionarAtivFisica = function () {
            if ($scope.habitoAtvFisica.RealizaAtividadeFisica == "true") {
                var parametrosAtvFisica = {
                    Id: $scope.habitoAtvFisica.Id,
                    IdHabitoAtividadeFisica: $scope.habitoAtvFisica.IdHabitoAtividadeFisica,
                    DescricaoAtividadeFisica: $scope.habitoAtvFisica.DescricaoAtividadeFisica != null ? $scope.habitoAtvFisica.DescricaoAtividadeFisica.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Frequencia: $scope.habitoAtvFisica.Frequencia != null ? $scope.habitoAtvFisica.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Ativo: true
                }

                HabitosService.editarItemHabitosAtivFisica(parametrosAtvFisica).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })
            }
            else {

                var parametrosAtvFisica = {
                    Id: $scope.habitoAtvFisica.IdHabitoAtividadeFisica,
                    IdUsuario: $rootScope.id,
                    RealizaAtividadeFisica: $scope.habitoAtvFisica.RealizaAtividadeFisica,
                    Atividades: [{}]
                }

                HabitosService.editarHabitosAtivFisica(parametrosAtvFisica).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })

            }
        }

        $scope.atualizarCampos = function () {
            $scope.habitoAtvFisica.DescricaoAtividadeFisica = "";
            $scope.habitoAtvFisica.Frequencia = "";
        }

        $scope.cancelarAtivFisica = function () {
            $state.go('menu.habitos');
        }


    })

    .controller('AdicionarHabitoAtivFisicaController', function ($scope, $state, HabitosService, $ionicPopup, $rootScope) {

        if ($state.params.habito) {
            $scope.habitoAtvFisica = angular.fromJson($state.params.habito);
            $scope.habitoAtvFisica.RealizaAtividadeFisica = $scope.habitoAtvFisica.RealizaAtividadeFisica.toString();
        }
        else {
            $scope.habitoAtvFisica = { Id: 0 };
        }


        $scope.adicionarAtivFisica = function () {
            //primeira inserção 
            if ($scope.habitoAtvFisica.Id == 0) {
                if ($scope.habitoAtvFisica.RealizaAtividadeFisica == "true") {

                    var parametrosAtvFisica = {
                        IdUsuario: $rootScope.id,
                        RealizaAtividadeFisica: $scope.habitoAtvFisica.RealizaAtividadeFisica,
                        Atividades: [{
                            DescricaoAtividadeFisica: $scope.habitoAtvFisica.DescricaoAtividadeFisica != null ? $scope.habitoAtvFisica.DescricaoAtividadeFisica.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                            Frequencia: $scope.habitoAtvFisica.Frequencia != null ? $scope.habitoAtvFisica.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null
                        }]
                    }
                }
                else {
                    var parametrosAtvFisica = {
                        IdUsuario: $rootScope.id,
                        RealizaAtividadeFisica: $scope.habitoAtvFisica.RealizaAtividadeFisica,
                        Atividades: null
                    }
                }

                HabitosService.salvarHabitosAtivFisica(parametrosAtvFisica).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })
            }
            else { //já existe consumo de bebida

                $scope.habitoAtvFisica.Atividades.push({
                    IdHabitoAtividadeFisica: $scope.habitoAtvFisica.Id,
                    DescricaoAtividadeFisica: $scope.habitoAtvFisica.DescricaoAtividadeFisica != null ? $scope.habitoAtvFisica.DescricaoAtividadeFisica.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null,
                    Frequencia: $scope.habitoAtvFisica.Frequencia != null ? $scope.habitoAtvFisica.Frequencia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '') : null
                })


                var parametrosAtvFisica = {
                    Id: $scope.habitoAtvFisica.Id,
                    IdUsuario: $scope.habitoAtvFisica.IdUsuario,
                    RealizaAtividadeFisica: $scope.habitoAtvFisica.RealizaAtividadeFisica,
                    Atividades: $scope.habitoAtvFisica.Atividades
                }

                HabitosService.editarHabitosAtivFisica(parametrosAtvFisica).then(function (dados) {
                    $state.go('menu.habitos');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: 'Ocorreu um erro, tente novamente mais tarde!'
                    });
                })

            }
        }

        $scope.cancelarAtivFisica = function () {
            $scope.habitoAtvFisica = {};
            $state.go('menu.habitos');
        }
    })

    .controller('EditarHabitoTabagismoController', function ($scope, $state, $filter, HabitosService, $ionicPopup, AppService, $rootScope) {
        $scope.habitoTabagismo = angular.fromJson($state.params.habito);

        //dropdown tempo
        $scope.opcoesData = [{ value: 'dias', label: 'dia(s)' }, { value: 'semanas', label: 'semana(s)' }, { value: 'meses', label: 'mese(s)' }, { value: 'anos', label: 'ano(s)' }];

        //conversão fumante
        $scope.habitoTabagismo.Fumante = $scope.habitoTabagismo.Fumante.toString();


        //conversão há quanto tempo
        var relativeDate = $filter('relativeDate')
        var dataCorreta = new Date($scope.habitoTabagismo.DataInicioConsumo);
        if (dataCorreta.getFullYear() != 1) {
            var dataFormatadaRelativa = relativeDate(dataCorreta);
            var dataRelativaSeparada = AppService.transformarRelativaParaData(dataFormatadaRelativa);

            $scope.habitoTabagismo.valorData = dataRelativaSeparada.valorData;
            $scope.habitoTabagismo.tempoData = dataRelativaSeparada.tempoData;
        }
        else {
            $scope.habitoTabagismo.valorData = null;
            $scope.habitoTabagismo.tempoData = "";
        }



        $scope.adicionarTabagismo = function () {

            if ($scope.habitoTabagismo.Fumante == "true") {
                var parametrosTagabismo = {
                    Id: $scope.habitoTabagismo.Id,
                    IdUsuario: $rootScope.id,
                    Fumante: true,
                    DataInicioConsumo: AppService.transformarDataParaRelativa($scope.habitoTabagismo.tempoData, $scope.habitoTabagismo.valorData),
                    QuantidadeDiaria: Number($scope.habitoTabagismo.QuantidadeDiaria),
                    Ativo: true
                }
            }
            else {
                var parametrosTagabismo = {
                    Id: $scope.habitoTabagismo.Id,
                    IdUsuario: $rootScope.id,
                    Fumante: false,
                    DataInicioConsumo: null,
                    QuantidadeDiaria: null,
                    Ativo: true
                }
            }

            HabitosService.editarHabitosTabagismo(parametrosTagabismo).then(function (dados) {
                $state.go('menu.habitos');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            })

        }

        $scope.atualizarCampos = function () {
            $scope.habitoTabagismo.valorData = null;
            $scope.habitoTabagismo.tempoData = "";
            $scope.habitoTabagismo.QuantidadeDiaria = "";

        }

        $scope.cancelarTabagismo = function () {
            $scope.habitoTabagismo = {};
            $state.go('menu.habitos');
        }
    })
    .controller('AdicionarHabitoTabagismoController', function ($scope, $state, $filter, HabitosService, $ionicPopup, AppService, $rootScope) {
        $scope.opcoesData = [{ value: 'dias', label: 'dia(s)' }, { value: 'semanas', label: 'semana(s)' }, { value: 'meses', label: 'mese(s)' }, { value: 'anos', label: 'ano(s)' }];

        $scope.habitoTabagismo = {};

        $scope.adicionarTabagismo = function () {
            var parametrosTagabismo = {
                IdUsuario: $rootScope.id,
                Fumante: ($scope.habitoTabagismo.Fumante == "true" ? true : false),
                DataInicioConsumo: AppService.transformarDataParaRelativa($scope.habitoTabagismo.tempoData, $scope.habitoTabagismo.valorData),
                QuantidadeDiaria: Number($scope.habitoTabagismo.QuantidadeDiaria)
            }


            HabitosService.salvarHabitosTabagismo(parametrosTagabismo).then(function (dados) {
                $state.go('menu.habitos');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }

        $scope.atualizarCampos = function () {
            $scope.habitoTabagismo.valorData = null;
            $scope.habitoTabagismo.tempoData = "";
            $scope.habitoTabagismo.QuantidadeDiaria = "";

        }

        $scope.cancelarTabagismo = function () {
            $scope.habitoTabagismo = {};
            $state.go('menu.habitos');
        }
    });
