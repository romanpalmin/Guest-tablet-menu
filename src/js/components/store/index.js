import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);
import * as m_types from './mutations-types'
import * as a_types from './actions-types'
import ajax from '/js/components/helpers/ajax.js';
const operation = {};
let test = true;
const store = new Vuex.Store({
    state: {
        app: {
            server: '',
            urlSmallImage: 'img/',
            urlBigImage: 'images/',
            urlBackImage: 'images',
            images: {
                logo: 'beer-zha.png',
                close: 'close.png'
            },
            MenuPoints: []
        }
    },
    mutations: {
        [m_types.SET_CATEGORY](state, payload){
            state.app.MenuPoints = payload;
        }
    },
    actions: {
        [a_types.GET_CATEGORY](state){
            let res = [];
            operation.name = 'categories';
            test = !test;
            ajax.exec(operation, function (resp) {
                if (test) {
                    //state.appState.MenuPoints = _.reverse(resp.data);
                    commit('SET_CATEGORY', _.reverse(resp.data));
                }
                else {
                    commit('SET_CATEGORY', resp.data);
                }
                console.log(666);
                console.log(state.app.MenuPoints);
            });
        }
    }
});
export default store;