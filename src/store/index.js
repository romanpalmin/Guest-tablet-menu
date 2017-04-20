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
            orders: []
        }
    },
    mutations: {
        [m_types.SET_CATEGORY](state, payload){
            state.app.MenuPoints = payload;
        },
        [m_types.SET_SETTINGS](state, payload){
            state.settings = payload;
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
                console.log('Номер планшета ' + resp.data);
                commit('SET_TABLET_NUMBER', resp.data);
            });
        },
        [a_types.GET_BLE]({commit}){
            ajax.exec({name: 'getBle'}, function (resp) {
                //state.appState.BleLabels = resp.data;
                console.log('Метки:');
                console.log(resp.data);
                commit('SET_BLE_LABEL', resp.data);
            });
        },
        [a_types.GET_ORDERS]({commit}){
            ajax.exec({name: 'order'}, function (resp) {
                console.log('Заказ:');
                console.log(resp.data);
                commit('SET_ORDERS');
            });
        }
    }
});
export default store;