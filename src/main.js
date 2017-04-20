import Vue from 'vue'
import Vuex from 'vuex'
import menu from './js/Menu.vue';
import plainmenu from './js/components/PlainMenu.vue';
import userorder from './js/components/UserOrder.vue';
import order from './js/Order.vue';
import shedule from './js/Shedule.vue';
import fishki from './js/Fishki.vue';
import actions from './js/Actions.vue';
import tables from './js/Tables.vue';
import modal from './js/Modal.vue';
import tablenumber from './js/TableNumber.vue';
import wheretablet from './js/WhereTablet.vue';
import VueRouter from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import upState from './js/components/helpers/updateState';
import state from './js/components/store/currentStates';
import scan from './js/components/helpers/scancode.js';
import scanBLE from './js/components/helpers/scanbt.js';
import ajax from './js/components/helpers/ajax.js';
import bleLabels from  './js/components/helpers/defineBtLabel';
import settings from './settings.js';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

import store from './store';



const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'fishki', path: '/:lang/fishki', component: fishki},
    {name: 'actions', path: '/:lang/actions', component: actions},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'plainmenu', path: '/:lang/menu/:id', component: plainmenu},
    {name: 'test2', path: '/:lang/ord', component: userorder},
    {name: 'modal', path: '/:lang/modal', component: modal},
    {name: 'tables', path: '/:lang/tables', component: tables},
    {name: 'tablenumber', path: '/:lang/tablenumber', component: tablenumber},
    {name: 'wheretablet', path: '/:lang/wheretablet', component: wheretablet}
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});
router.replace('/ru/menu');


const app = new Vue({
    data() {
        return {
            TabletNumber: state.appState.TabletNumber,
            language: state.settings.language,
            showMenu: true,
        }
    },
    store,
    mounted(){
        this.initApp();
        // определение меток для определения стола
        bleLabels();
        // сканирование QR-кода
        scan(router);
        //
        scanBLE();


    },
    methods :{
        changeLanguage(){
            let path;
            state.settings.language = this.language === 'ru' ? 'en' : 'ru';
            this.language = state.settings.language;
            path = `/${state.settings.language}/menu`;
            this.emptyCache();
            this.$router.replace(path);
        },

        emptyCache(){
            state.appState.MenuPoints.length = 0;
            //Array.from(state.appState.Category).forEach(function(item){
            for (let item in state.appState.Category){
                state.appState.Category[item+''].currentState.length = 0;
            }
        },

        initApp(){
            let tabletNumber = state.appState.TabletNumber;
            const self = this;
            // заполним исходное состояние корзины
            ajax.exec({name : 'order'}, function(response){
                state.appState.orders.currentState = response.data;
            });

            // заполним исходноеколичество меток
            ajax.exec({name: 'getBle'}, function (resp) {
                state.appState.BleLabels = resp.data;
            });

            // получим номер планшета
            if (tabletNumber === '') {
                ajax.exec({name : 'getTabletNumber'}, function (resp) {
                    self.TabletNumber = resp.data;
                    state.appState.TabletNumber = resp.data;
                });
            }
            else {
                tabletNumber = state.appState.TabletNumber;
            }
        },

        init

    },
    router,
    template: `
    <div id="app-menu" >
    <div class="head" v-show="showMenu">
    <div class="header" >
        <nav v-if= "language === 'ru'" class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/Actions" class="link-page link">Анкета</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/tablenumber" class="link-page link">Стол</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы заказали</router-link></div>
        </nav>
         <nav v-else class="pages-nav">
            <div class="pages-nav__item "><router-link to="/en/Actions" class="link-page link">Questionnaire</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/shedule" class="link-page link">Shedule</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/menu" class="link-page link">Menu</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/tablenumber" class="link-page link">Table</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/order" class="link-page link">Your order</router-link></div>
        </nav>
        
      </div>
      <div class="tabletNumber" name="tabletNumber">{{TabletNumber}}</div>
      <div class="language" name="language" @click="changeLanguage()">{{language}}</div>
      </div>
      <div class="content">
      
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');

let updateInterval = setInterval(function () {
    upState();
}, state.settings.updateStatePeriod);




