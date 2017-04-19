import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import * as types from './mutations-types'

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    mutations: {},
    actions: {}
});
export default store;