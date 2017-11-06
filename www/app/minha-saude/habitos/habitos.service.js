angular.module('app_hospitais.habitos')

    .service('HabitosService', function ($q, $http) {

        return {
            buscarHabitosTabagismo: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'tabagismo/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarHabitosTabagismo: function (tabagismo) {
                return $http.post(AppSettings.apiEndpoint + 'tabagismo', tabagismo).then(function (response) {
                    return response.data;
                });
            },
            editarHabitosTabagismo: function (tabagismo) {
                return $http.put(AppSettings.apiEndpoint + 'tabagismo', tabagismo).then(function (response) {
                    return response.data;
                });
            },
            buscarHabitosConsomeBebida: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'consomebebida/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarHabitosConsomeBebida: function (consomeBebida) {

                return $http.post(AppSettings.apiEndpoint + 'consomebebida', consomeBebida).then(function (response) {
                    return response.data;
                });
            },
            editarHabitosConsomeBebida: function (consomeBebida) {
                return $http.put(AppSettings.apiEndpoint + 'consomebebida', consomeBebida).then(function (response) {
                    return response.data;
                });
            },
            salvarItemConsomeBebida: function (ItensBebidas) {
                return $http.post(AppSettings.apiEndpoint + 'ItemBebida', ItensBebidas).then(function (response) {
                    return response.data;
                });
            },
            editarItemConsomeBebida: function (ItensBebidas) {
                return $http.put(AppSettings.apiEndpoint + 'ItemBebida', ItensBebidas).then(function (response) {
                    return response.data;
                });
            },
            excluirItemConsomeBebida: function (id_item_bebida) {
                return $http.delete(AppSettings.apiEndpoint + 'ItemBebida/' + id_item_bebida).then(function (response) {
                    return response.data;
                });
            },
            buscarHabitosAtivFisica: function (id_usuario) {
                return $http.get(AppSettings.apiEndpoint + 'AtividadeFisica/' + id_usuario).then(function (response) {
                    return response.data;
                });
            },
            salvarHabitosAtivFisica: function (atividadeFisica) {

                return $http.post(AppSettings.apiEndpoint + 'AtividadeFisica', atividadeFisica).then(function (response) {
                    return response.data;
                });
            },
            editarHabitosAtivFisica: function (atividadeFisica) {
                return $http.put(AppSettings.apiEndpoint + 'AtividadeFisica', atividadeFisica).then(function (response) {
                    return response.data;
                });
            },
            editarItemHabitosAtivFisica: function (atividadeFisica) {
                return $http.put(AppSettings.apiEndpoint + 'ItemAtividadeFisica', atividadeFisica).then(function (response) {
                    return response.data;
                });
            },
            excluirItemHabitosAtivFisica: function (id_item_atv_fisica) {
                return $http.delete(AppSettings.apiEndpoint + 'ItemAtividadeFisica/' + id_item_atv_fisica).then(function (response) {
                    return response.data;
                });
            }
        };
    });
