import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);
import * as m_types from './mutations-types'
import * as a_types from './actions-types'
import ajax from './../js/components/helpers/ajax.js'
import LsPut from './../js/components/helpers/lsPut.js';
//import LsGet from './../js/components/lsGet.js';
const operation = {};
const store = new Vuex.Store({
        state: {
            settings: {},
            app: {
                MenuPoints: [],
                TabletNumber: 0,
                BleLabels: [],
                orders: [],
                Category: {},
                show: [],
                selectedPosition: {},
                TableNumberPrimary: 333,
                LastTimeUpdate: '',
                LocalPaths: {Positions: {}, Small: {}, Category: {}, LargePositions: {}},
                SyncCounter: 0,
                OrderCounter: 0,
                FullTree: [],
                SourceTree: [],
                showModalAnketa: false,
                isShowModalAnketa: true,
                showModalActions: false,
                isShowModalActions: true,
                actions:[],
                changePage: true
            }
        },
        mutations: {
            [m_types.SET_CHANGE_PAGE](state){
                state.app.changePage = !state.app.changePage;
            },
            /**
             * заполняет текущие акции
             * @param state
             * @param payload
             */
            [m_types.SET_ACTIONS](state, payload){
                console.log(payload);
                state.app.actions = _.map(payload.actions, (item)=>{
                  return item;
                });
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            /**
             * Включает модальное окно
             * @param state
             * @param payload
             */
            [m_types.SET_MODAL_ACTIONS_SHOW](state, payload){
                state.app.showModalActions = payload.value;
            },

            /**
             * Проверяет, нужно ли показывать модальное окно акций
             * @param state
             * @param payload
             */
            [m_types.SET_IS_SHOW_MODAL_ACTIONS](state, payload){
                state.app.isShowModalActions = payload.value;
            },
            /**
             * Включает модальное окно
             * @param state
             * @param payload
             */
            [m_types.SET_MODAL_ANKETA_SHOW](state, payload){
                console.log('оТКРЫВАЕМ окно акций');
                state.app.showModalAnketa = payload.value;
            },

            /**
             * Проверяет, нужно ли показывать модальное окно
             * @param state
             * @param payload
             */
            [m_types.SET_IS_SHOW_MODAL_ANKETA](state, payload){
                state.app.isShowModalAnketa = payload.value;
            },

            [m_types.SET_CATEGORY](state, payload){
                state.app.MenuPoints = payload;
                LsPut('MenuPoints', JSON.stringify(payload));
            },
            [m_types.SET_LAST_TIME_UPDATE](state, payload){
                state.app.LastTimeUpdate = payload.data;
                //console.log('Обновление из запроса: ' + payload.data);
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.EMPTY_ORDER](state, payload){
                state.app.orders = [];
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.SET_SELECTED_POSITION](state, payload){
                state.app.selectedPosition = payload;
            },
            [m_types.SET_SETTINGS](state, payload){
                state.settings = payload;
            },
            [m_types.SET_PRIMARY_TABLE_NUMBER](state, payload){
                state.TableNumberPrimary = payload;
            },
            [m_types.SET_CATEGORY_POSITIONS](state, payload){
                state.app.Category = payload;
            },
            [m_types.POPULATE_CATEGORY](state, payload){
                state.app.Category[payload.currentId].currentState = payload.currentData;
                let key = 'cat' + payload.currentId;
                LsPut(key, JSON.stringify(payload.currentData));
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.SET_TABLET_NUMBER](state, payload){
                state.app.TabletNumber = payload;
            },
            [m_types.SET_LANGUAGE](state, payload){
                state.settings.language = payload;
            },
            [m_types.SET_BLE_LABEL](state, payload){
                state.app.BleLabels = payload;
            },
            [m_types.SET_ORDERS](state, payload){
                console.log('ОБНОВЛЕНИЕ ЗАКАЗА');
                //console.log(payload);
                state.app.orders = payload.data;
            },
            [m_types.SET_ORDERS_CALLBACK](state, payload){
                state.app.orders = payload.data;
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.DELETE_POSITION_IN_ORDER_BY_ID](state, payload){
                state.app.orders = _.without(state.app.orders, _.find(state.app.orders, {
                    code: payload.id,
                    stroka: payload.stroka
                }));
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.SET_SHOW](state, payload){
                state.app.show = payload.data;
                if (payload.callback && typeof(payload.callback) === "function") {
                    payload.callback();
                }
            },
            [m_types.SET_LOCAL_PATH](state, payload){
                switch (payload.type) {
                    case 'empty':
                        state.app.LocalPaths[payload.name] = payload.value;
                        break;
                    case 'positions':
                        state.app.LocalPaths.Positions[payload.name] = payload.value;
                        LsPut('positions', JSON.stringify(state.app.LocalPaths.Positions));
                        if (payload && payload.callback && typeof(payload.callback) === "function") {
                            payload.callback();
                        }
                        break;
                    case 'category':
                        state.app.LocalPaths.Category[payload.name] = payload.value;
                        LsPut('category', JSON.stringify(state.app.LocalPaths.Category));
                        if (payload.callback && typeof(payload.callback) === "function") {
                            payload.callback();
                        }
                        break;
                    case 'small':
                        state.app.LocalPaths.Small[payload.name] = payload.value;
                        break;
                    case 'large':
                        state.app.LocalPaths.LargePositions[payload.name] = payload.value;
                        LsPut('large', JSON.stringify(state.app.LocalPaths.LargePositions));
                        if (payload && payload.callback && typeof(payload.callback) === "function") {
                            payload.callback();
                        }
                        break;
                    default:
                        break;
                }
            },
            [m_types.SET_LOCAL_PATH_FULL](state, payload){
                switch (payload.type) {
                    case 'positions':
                        state.app.LocalPaths.Positions = payload.value;
                        break;
                    case 'category':
                        state.app.LocalPaths.Category = payload.value;
                        break;
                    case 'small':
                        state.app.LocalPaths.Small = payload.value;
                        break;
                    case 'large':
                        state.app.LocalPaths.LargePositions = payload.value;
                        break;
                    default:
                        break;
                }
                //alert(JSON.stringify(state.app.LocalPaths));
            },
            [m_types.INCREMENT_SYNC_COUNTER](state){
                //state.app.SyncCounter++;
                //todo alert
            },
            [m_types.INCREMENT_ORDER_COUNTER](state){
                //state.app.OrderCounter++;
                //todo alert
            },
            [m_types.SET_FULL_TREE](state, payload){
                state.app.FullTree = payload;
/*                state.app.FullTree = _.map(state.app.FullTree, (item) => {
                    console.log(item);
                    return item;
                })*/
                // console.log(payload);
            }
            ,
            [m_types.SET_SOURCE_TREE](state, payload){
                state.app.SourceTree = payload;
                /*                state.app.FullTree = _.map(state.app.FullTree, (item) => {
                                    console.log(item);
                                    return item;
                                })*/
                // console.log(payload);
            }
        },
        actions: {
            /**
             * Загружает список текущих акций
             * @param commit
             * @param state
             * @param payload
             */
            [a_types.GET_ACTIONS]({commit, state}, payload){
                ajax.exec({name: 'getActions'}, resp => {
                    console.log(resp);
                    commit('SET_ACTIONS', {actions: resp.data});
                });
            },
            [a_types.GET_CATEGORY]({commit, state}, payload){
                let categoryPositions = {};
                let idx = 0;
                operation.name = 'categories';
                ajax.exec(operation, function (resp) {
                    commit('SET_CATEGORY', resp.data);
                    resp.data.forEach(function (item, i, arr) {
                        idx++;
                        categoryPositions[item.code] = {
                            name: item.name,
                            currentState: []
                        };
                        if (idx === arr.length) {
                            if (!_.isEqual(state.app.Category, categoryPositions)) {
                                commit('SET_CATEGORY_POSITIONS', categoryPositions);
                            }

                            if (payload && payload.callback && typeof(payload.callback) === "function") {
                                payload.callback();
                            }
                        }
                    });
                });

            },
            [a_types.GET_TABLET_NUMBER]({commit}){
                ajax.exec({name: 'getUserName'}, function (resp) {
                    commit('SET_TABLET_NUMBER', resp.data.pass);
                });
            },
            [a_types.GET_BLE]({commit}){
                ajax.exec({name: 'getBle'}, function (resp) {
                    commit('SET_BLE_LABEL', resp.data);
                });
            },
            [a_types.GET_ORDERS]({commit}, payload){
                let cb = {};
                ajax.exec({name: 'order'}, function (resp) {
                    //alert('answer');
                    //alert(JSON.stringify(resp.data));
                    cb.data = resp.data;
                    if (payload && payload.callback) {
                        cb.callback = payload.callback;
                    }
                    commit('SET_ORDERS_CALLBACK', cb);
                    commit('SET_ORDERS', resp);
                });
            },
            [a_types.GET_POSITIONS]({commit}, payload){
                return new Promise((resolve, reject) => {
                    let positionsList = [];
                    operation.name = 'positions';
                    operation.catId = payload.id;
                    ajax.exec(operation, function (response) {
                        formatJson(response.data);
                    });

                    function formatJson(resp) {
                        if (resp.length === 1) {
                            if (resp[0].tovar) {
                                positionsList = resp[0];
                            }
                            else {
                                positionsList = resp;
                            }
                        } else {
                            positionsList = resp;
                        }
                        commit('POPULATE_CATEGORY', {
                            currentId: payload.id,
                            currentData: positionsList,
                            callback: payload.callback
                        });
                    }
                });
            },
            [a_types.GET_ALL_POSITIONS]({commit, dispatch, state}){
                let ctgs = state.app.Category;
                _.map(ctgs, function (item, idx) {

                    dispatch('GET_POSITIONS', {id: idx});
                })
            },
            [a_types.ADD_TO_CART]({commit}, payload){
                const options = {
                    name: 'addToOrder',
                    positionId: payload.positionId,
                    tableId: payload.TableNumberPrimary,
                    count: payload.count
                };
                let cb = {};
                ajax.exec(options, function (response) {
                    if (response.data === 1) {
                        options.name = 'order';
                        ajax.exec(options, function (response) {
                            cb.data = response.data;
                            cb.callback = payload.callback;
                            commit('SET_ORDERS_CALLBACK', cb);
                        })
                    } else {
                        console.log('Ошибка добавления заказа');
                    }
                })
            },

            /**
             * Отправляет результат выбора из анкеты
             * @param payload
             */
                [a_types.SEND_ANKETA]({}, payload){
                const operation = {
                    name: 'sendAnketa',
                    value: payload.code,
                    phone: payload.phone
                };

                ajax.exec(operation, function (response) {
                    console.log('Телефон:' + payload.phone + '\nДлина: ' + payload.phone.length);
                    if (payload.phone && payload.phone.length === 11) {
                        const secondOperation = {
                            name: 'sendPhone',
                            phone: payload.phone
                        };
                        ajax.exec(secondOperation, resp => {
                            if (payload.callback && typeof(payload.callback) === "function") {
                                payload.callback(resp.data);
                            }
                        });
                    } else {
                        payload.callback({'status': -1});
                    }
                });

            },
            [a_types.TURN_ON_LAMP]({commit}, payload){
                //console.log('Подсвечиваем товар и шлем обратно');
                const operation = {
                    name: 'showLamp',
                    id: payload.currentId
                };
                ajax.exec(operation);
            },
            [a_types.EMPTY_ORDERS_FULL]({commit}, payload){
                ajax.exec({name: 'clearOrder'}, function () {
                    commit('EMPTY_ORDER', payload);
                });
            },
            [a_types.DELETE_ORDER_BY_ID]({commit}, payload){
                const operation = {
                    name: 'deleteFromOrder',
                    id: payload.id,
                    stroka: payload.stroka
                };
                ajax.exec(operation, function () {
                    commit('DELETE_POSITION_IN_ORDER_BY_ID', payload);
                });
            },
            [a_types.EMPTY_STRING_BY_ID]({dispatch}, payload){
                const operation = {
                    name: 'deleteStringFromOrder',
                    positionId: payload.positionId
                };
                ajax.exec(operation, function () {
                    dispatch('GET_ORDERS', payload);
                });
            },
            [a_types.GET_SHOW]({commit}, payload){
                const operation = {
                    name: 'show'
                };
                ajax.exec(operation, function (resp) {
                    payload.data = resp.data;
                    commit('SET_SHOW', payload);
                });
            },
            [a_types.GET_LAST_UPDATE]({commit}, payload){
                let cb = {};
                ajax.exec({name: 'getLastTimeUpdate'}, function (resp) {
                    cb.data = resp.data;
                    if (payload && payload.callback) {
                        cb.callback = payload.callback;
                    }
                    commit('SET_LAST_TIME_UPDATE', cb);
                });
            },
            [a_types.GET_FULL_TREE]({commit}){
                let cb = {};
                const self = this;
                ajax.exec({name: 'getDataNew'}, function (resp) {
                    formNewData(resp.data);
                });
                function formNewData(json) {
                    json.items = _.filter(json.items, (itms) => {
                        return (+itms.price > 0 && itms.price !== '');
                    });
                    commit('SET_SOURCE_TREE', json);
                    let roots = _.filter(json.groups, function (item) {
                        if (item.parrent_code === '') {
                            // заполняем первый уровень
                            item.groups = _.filter(json.groups, function (sub1) {
                                if (sub1.parrent_code !== sub1.code && sub1.parrent_code === item.code) {
                                    sub1.items = _.filter(json.items, function (item1) {
                                        //item1.img = загружваем на планшет
                                        return item1.parent_code === sub1.code;
                                    });
                                    // заполняем второй уровень
                                    sub1.groups = _.filter(json.groups, function (sub2) {
                                        if (sub2.parrent_code !== sub2.code && sub2.parrent_code === sub1.code) {
                                            sub2.items = _.filter(json.items, function (item2) {
                                                //item2.img = загружваем на планшет
                                                return item2.parent_code === sub2.code;
                                            });
                                            // Заполняем третий уровень
                                            sub2.groups = _.filter(json.groups, function (sub3) {
                                                if (sub3.parrent_code !== sub3.code && sub3.parrent_code === sub2.code) {
                                                    sub3.items = _.filter(json.items, function (item3) {
                                                        //item3.img = загружваем на планшет
                                                        return item3.parent_code === sub3.code;
                                                    });
                                                    // Заполняем четвертый уровень
                                                    sub3.groups = _.filter(json.groups, function (sub4) {
                                                        if (sub4.parent_code !== sub4.code && sub4.parrent_code === sub3.code) {
                                                            // При добавление новых уровней, добавляем фильтры по аналогичному алгоритму...
                                                            sub4.order = +sub4.order;
                                                            return sub4;
                                                        }
                                                    });
                                                    sub3.order = +sub3.order;
                                                    return sub3;
                                                }
                                            });
                                            sub2.order = +sub2.order;
                                            return sub2;
                                        }
                                    });
                                    sub1.order = +sub1.order;
                                    return sub1;
                                }
                            });
                            item.order = +item.order;
                            return item;
                        }
                    });
                    commit('SET_FULL_TREE', roots);
                }
            }
        }
    });
export default store;