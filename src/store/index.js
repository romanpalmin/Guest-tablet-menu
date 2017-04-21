import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);
import * as m_types from './mutations-types'
import * as a_types from './actions-types'
import ajax from './../js/components/helpers/ajax.js'
const operation = {};
let test = true;
const store = new Vuex.Store({
    state: {
        settings: {},
        app: {
            MenuPoints: [],
            TabletNumber: 0,
            BleLabels: [],
            orders: [],
            Category: {},
            show: []
        }
    },
    mutations: {
        [m_types.SET_CATEGORY](state, payload){
            state.app.MenuPoints = payload;
        },
        [m_types.SET_SETTINGS](state, payload){
            state.settings = payload;
        },
        [m_types.SET_CATEGORY_POSITIONS](state, payload){
            state.app.Category = payload;
        },
        [m_types.POPULATE_CATEGORY](state, payload){
            state.app.Category[payload.currentId].currentState = payload.currentData;
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
            state.app.orders = payload;
        }
    },
    actions: {
        [a_types.GET_CATEGORY]({commit}){
            operation.name = 'categories';
            test = !test;
            ajax.exec(operation, function (resp) {
                if (test) {
                    commit('SET_CATEGORY', _.reverse(resp.data));
                }
                else {
                    commit('SET_CATEGORY', resp.data);
                }
            });
        },
        [a_types.GET_TABLET_NUMBER]({commit}){
            ajax.exec({name: 'getTabletNumber'}, function (resp) {
                commit('SET_TABLET_NUMBER', resp.data);
            });
        },
        [a_types.GET_BLE]({commit}){
            ajax.exec({name: 'getBle'}, function (resp) {
                commit('SET_BLE_LABEL', resp.data);
            });
        },
        [a_types.GET_ORDERS]({commit}){
            ajax.exec({name: 'order'}, function (resp) {
                commit('SET_ORDERS', resp.data);
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
                    commit('POPULATE_CATEGORY', {currentId: payload.id, currentData: positionsList, callback: payload.callback});
                }
            });
        }
    }
});
export default store;