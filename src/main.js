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
import posnew from './js/PositionsListNew.vue';
import tablenumber from './js/TableNumber.vue';
import wheretablet from './js/WhereTablet.vue';
import VueRouter from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import scan from './js/components/helpers/scancode.js';
import scanBLE from './js/components/helpers/scanbt.js';
import bleLabels from  './js/components/helpers/defineBtLabel';
import checkFile from './js/components/helpers/checkForExist.js';
import check from './js/components/helpers/checkFieldList';
import LsPut from './js/components/helpers/lsPut.js';
import LsGet from './js/components/helpers/lsGet.js';
import settings from './store/structures/settings.js';
import catPositions from './store/structures/categoryPositions.js';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

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
    {name: 'wheretablet', path: '/:lang/wheretablet', component: wheretablet},
    {name: 'test', path: '/:lang/newlist', component: posnew}
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});
router.replace('/ru/menu');


const app = new Vue({
    data() {
        return {
            TabletNumber: '',
            language: this.$store.state.settings.language,
            showMenu: true,
        }
    },
    store,
    mounted(){
        /*let docWidth = document.documentElement.clientWidth;
        let docHeight = document.documentElement.clientHeight;
        alert('Height:' + docHeight + '\n' + 'Width:' + docWidth);*/

        this.init();

        // определение меток для определения стола
        bleLabels();
        // сканирование QR-кода
        scan(router);
        //
        scanBLE();

        //


    },
    methods: {
        changeLanguage(){
            let path;
            let language = this.$store.state.settings.language === 'ru' ? 'en' : 'ru';
            this.$store.state.settings.language = language;
            this.language = language;
            path = `/${this.$store.state.settings.language}/menu`;
            this.emptyCache();
            this.$router.replace(path);
        },

        emptyCache(){
            this.$store.state.app.MenuPoints.length = 0;
            for (let item in this.$store.state.app.Category) {
                this.$store.state.app.Category[item + ''].currentState.length = 0;
            }
        },

        init(){
            const self = this;
            this.$store.commit('SET_SETTINGS', settings);
            this.$store.commit('SET_CATEGORY_POSITIONS', catPositions);
            this.$store.dispatch('GET_TABLET_NUMBER');
            this.$store.dispatch('GET_BLE');

            LsGet("small",(data)=>{
                //alert('Data for Small:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    if (JSON.stringify(this.$store.state.app.LocalPaths.Small) === '{}'){
                        try{
                            let payload = {
                                type: 'small',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch(err){
                            alert(err);
                        }
                    }
                }
            });

            LsGet("positions",(data)=>{
                //alert('Data for Positions:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    if (JSON.stringify(this.$store.state.app.LocalPaths.Positions) === '{}'){
                        try{
                            let payload = {
                                type: 'positions',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch(err){
                            alert(err);
                        }
                    }
                }
            });

            LsGet("large",(data)=>{
                //alert('Data for LargePositions:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null){
                    if (JSON.stringify(this.$store.state.app.LocalPaths.LargePositions) === '{}'){
                        try{
                            let payload = {
                                type: 'large',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch(err){
                            alert(err);
                        }
                    }
                }
            });


        }

    },
    router,
    template: `
    <div id="app-menu" >
    <div class="head" v-show="showMenu">
    <div class="header intro-header" >
        <nav v-if= "$store.state.settings.language === 'ru'" class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/Actions" class="link-page link">Анкета</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <!--<div class="pages-nav__item "><router-link to="/ru/tablenumber" class="link-page link">Стол</router-link></div>-->
             <div class="pages-nav__item "><router-link to="/ru/newlist" class="link-page link">Тест JSON</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы заказали</router-link></div>
        </nav>
         <nav v-else class="pages-nav">
            <div class="pages-nav__item "><router-link to="/en/Actions" class="link-page link">Questionnaire</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/shedule" class="link-page link">Shedule</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/menu" class="link-page link">Menu</router-link></div>
            <!--<div class="pages-nav__item "><router-link to="/en/tablenumber" class="link-page link">Table</router-link></div>-->
            <div class="pages-nav__item "><router-link to="/en/newlist" class="link-page link">Test</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/order" class="link-page link">Your order</router-link></div>
        </nav>
        
      </div>
      <div class="tabletNumber" name="tabletNumber">{{$store.state.app.TabletNumber}}</div>
      <div class="language" name="language" @click="changeLanguage()" v-if="$store.state.settings.showLanguageToggle">{{$store.state.settings.language}}</div>
      </div>
      <div class="content">
      
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');

/*let updateInterval = setInterval(function () {
    upState();
}, state.settings.updateStatePeriod);*/




