import Vue from 'vue'
import Vuex from 'vuex'
import menu from './js/Menu.vue';
import plainmenu from './js/components/PlainMenu.vue';
import modalAnswer from './js/components/modal-answer.vue';
import order from './js/Order.vue';
import shedule from './js/Shedule.vue';
import actions from './js/Actions.vue';
import actions3 from './js/Actions3.vue';
import actions4 from './js/Actions4.vue';
/*import actions2 from './js/Actions2.vue';*/
import wheretablet from './js/WhereTablet.vue';
import VueRouter from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import scan from './js/components/helpers/scancode.js';
import scanBLE from './js/components/helpers/scanbt.js';
import bleLabels from './js/components/helpers/defineBtLabel';
import LsGet from './js/components/helpers/lsGet.js';
import wakeLockAcquire from './js/components/helpers/power.js';
import timer from './js/components/helpers/timer';
import settings from './store/structures/settings.js';
import catPositions from './store/structures/categoryPositions.js';
import store from './store';
import modalActions from './js/components/modal-actions.vue';



Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'actions', path: '/:lang/actions', component: actions},
    /*{name: 'actions2', path: '/:lang/actions2', component: actions2},*/
    {name: 'actions3', path: '/:lang/actions3', component: actions3},
    {name: 'actions4', path: '/:lang/actions4', component: actions4},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'plainmenu', path: '/:lang/menu/:id', component: plainmenu},
    {name: 'wheretablet', path: '/:lang/wheretablet', component: wheretablet}
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});

router.afterEach((toRoute, fromRoute) => {
    if (toRoute.name === 'menu' && fromRoute.name !== 'order') {
        //console.log('Включаем показ модального окна');
        store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': true});
    } else {
        //console.log('Не включаем модальное окно');
    }

    if (
        (toRoute.name === 'plainmenu' && fromRoute.name !== 'order' && fromRoute.name !== 'plainmenu')
        || (fromRoute.name === 'order' && toRoute.name === 'plainmenu' && !store.state.app.isShowModalActions)) {
        console.log('Включаем цикл показа модальных окон!!!!!!');
        store.commit('SET_IS_SHOW_MODAL_ACTIONS', {'value': true});
    } else {
        if (toRoute.name !== 'plainmenu'
            && toRoute.name !== 'order'
            && store.state.app.isShowModalActions) {
            console.log('Выключаем цикл показа модальных окон');
            store.commit('SET_IS_SHOW_MODAL_ACTIONS', {'value': false});
        }
    }
});

router.replace('/ru/menu');
/*const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const foo = ()=> {
    for (let i = 1; i < n + 1; i++) {
        const result = await delay(i * 1000);
        console.log('wait', result);
    }
    return 'done';
};*/

const app = new Vue({
    data() {
        return {
            TabletNumber: '',
            language: this.$store.state.settings.language,
            showMenu: true,
        }
    },
    store,
    mounted() {
        /*let docWidth = document.documentElement.clientWidth;
         let docHeight = document.documentElement.clientHeight;
         alert('Height:' + docHeight + '\n' + 'Width:' + docWidth);*/
        const self = this;
        let startModalsShow = false;
        this.init();


        // определение меток для определения стола
        bleLabels();
        // ---сканирование QR-кода---
        // Очистка признака показа модального окна
        scan(router, () => {
            console.log('Очищаем признак показа модального окна');
            this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': true});
        });
        //
        scanBLE();

        // wakelock
        wakeLockAcquire();

        // Проверка обновлений
        let upTimerUpdate = setInterval(function () {
            let lastUpdate = self.$store.state.app.LastTimeUpdate;
            console.log('Старое значение:' + lastUpdate);
            let callback = function () {
                setTimeout(function () {
                    if (lastUpdate !== self.$store.state.app.LastTimeUpdate) {
                        console.log('Обновляем номенклатуру');
                        self.getNewJsonFullTree();
                    }
                    else {
                        console.log('Обновление не требуется');
                    }
                }, 1000)
            };
            self.$store.dispatch('GET_LAST_UPDATE', {callback: callback});
            self.$store.commit('INCREMENT_SYNC_COUNTER');
        }, 30000);

        let upTimerOrder = setInterval(function () {
            self.getJsonOrder(true);
        }, 30000);

        let updateShow = setInterval(function () {
            //console.log('Обновляется список развлечений');
            self.getShow();
        }, this.$store.state.settings.updateShow);

        let showModal = setInterval(() => {
            //console.log('Показывать или не показывать модальное окно анкеты');
            let condition = this.$store.state.app.isShowModalAnketa && //признак показа модального окна
                !this.$store.state.app.showModalAnketa && // признак того, что окно не открыто
                this.$store.state.settings.language === 'ru' && // признак того, что включен русский язык
                this.$router.currentRoute.name === 'plainmenu'; // признак того, что открыты категории
            if (condition) { // если все условия соблюдены
                this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': true});
            }
        }, 50000);

        let updateActions = setInterval(() => {
            this.$store.dispatch('GET_ACTIONS');
        }, 100000);

        let showModalActions = setInterval(() => {
            console.log('Проверяем, нужно ли показывать модальное окно');
            if (this.$store.state.app.isShowModalActions) {
                console.log('Да');
                if (!startModalsShow) {
                    startModalsShow = true;
                    console.log('Start');
                    this.startModals();

                } else {
                    console.log('Do nothing...');
                }
            } else {
                console.log('Нет');
                startModalsShow = false;
            }
        }, 1000);
    },
    components: {
        'modal-anketa': modalAnswer,
        'modal-actions': modalActions
    },
    methods: {
        /* startModals() {
             let counter = 1000;
             let foo = function () {
                 clearInterval(interval);
                 counter *= 2;
                 console.log(counter);
                 if (counter <= 20000) {
                     interval = setInterval(foo, counter);
                 }
             };
             let interval = setInterval(foo, counter);
         },*/

        startModals() {
            let timerStart = new timer();
            let index = 0;
            const self = this;
            timerStart.start(()=>{
                index++;
                console.log('Запускаем 2 раза' + index);
                if (index === 4) {
                    timerStart.set_interval(1000);
                }
                check();

            }, 2000, true);
            function check(){
                if (!self.$store.state.app.isShowModalActions){
                    console.log('Stop');
                    timerStart.stop();
                }
            }
        },

        showModalActions() {
            this.$store.commit('SET_MODAL_ACTIONS_SHOW', {'value': true});
        },
        closeModalActions() {
            this.$store.commit('SET_MODAL_ACTIONS_SHOW', {'value': false});
            this.$store.commit('SET_IS_SHOW_MODAL_ACTIONS', {'value': false});
        },
        showModal() {
            this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': true});
        },
        closeModal() {
            this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
            this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
        },
        getNewJsonFullTree() {
            this.$store.dispatch('GET_FULL_TREE');
        },

        getJsonOrder() {
            this.$store.dispatch('GET_ORDERS');
            this.$store.commit('INCREMENT_ORDER_COUNTER');
        },

        getShow: function () {
            this.$store.dispatch('GET_SHOW');
        },
        changeLanguage() {
            let path;
            let language = this.$store.state.settings.language === 'ru' ? 'en' : 'ru';
            this.$store.state.settings.language = language;
            this.language = language;
            path = `/${this.$store.state.settings.language}/menu`;
            this.emptyCache();
            this.getNewJsonFullTree();
            //this.$router.replace(path);
        },

        emptyCache() {
            this.$store.state.app.MenuPoints.length = 0;
            for (let item in this.$store.state.app.Category) {
                this.$store.state.app.Category[item + ''].currentState.length = 0;
            }
        },

        init() {
            const self = this;
            this.$store.commit('SET_SETTINGS', settings);
            this.$store.commit('SET_CATEGORY_POSITIONS', catPositions);
            this.$store.dispatch('GET_TABLET_NUMBER');
            this.$store.dispatch('GET_BLE');
            this.$store.dispatch('GET_ACTIONS');

            LsGet("small", (data) => {
                //alert('Data for Small:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null) {
                    if (JSON.stringify(this.$store.state.app.LocalPaths.Small) === '{}') {
                        try {
                            let payload = {
                                type: 'small',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch (err) {
                            alert(err);
                        }
                    }
                }
            });

            LsGet("positions", (data) => {
                //alert('Data for Positions:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null) {
                    if (JSON.stringify(this.$store.state.app.LocalPaths.Positions) === '{}') {
                        try {
                            let payload = {
                                type: 'positions',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch (err) {
                            alert(err);
                        }
                    }
                }
            });

            LsGet("large", (data) => {
                //alert('Data for LargePositions:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null) {
                    if (JSON.stringify(this.$store.state.app.LocalPaths.LargePositions) === '{}') {
                        try {
                            let payload = {
                                type: 'large',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch (err) {
                            alert(err);
                        }
                    }
                }
            });

            LsGet("category", (data) => {
                //alert('Data for LargePositions:' + data);
                if (JSON.parse(data) !== void 1 && JSON.parse(data) !== null) {
                    if (JSON.stringify(this.$store.state.app.LocalPaths.Category) === '{}') {
                        try {
                            let payload = {
                                type: 'category',
                                value: JSON.parse(data)
                            };
                            self.$store.commit('SET_LOCAL_PATH_FULL', payload);
                        }
                        catch (err) {
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
            <div class="pages-nav__item" @click="showModalActions()">ModalA</div>
            <div class="pages-nav__item "><router-link to="/ru/Actions4" class="link-page link">Actions</router-link></div>
            <!--<div class="pages-nav__item "><router-link to="/ru/Actions" class="link-page link">Анкета</router-link></div>-->
            <!--<div class="pages-nav__item "><router-link to="/ru/Actions2" class="link-page link">Акция</router-link></div>-->
            <div class="pages-nav__item "><router-link to="/ru/Actions3" class="link-page link">Анкета</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы заказали</router-link></div>
        </nav>
         <nav v-else class="pages-nav">
            <!--<div class="pages-nav__item "><router-link to="/en/Actions3" class="link-page link">Questionnaire</router-link></div>-->
            <div class="pages-nav__item "><router-link to="/en/shedule" class="link-page link">Shedule</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/menu" class="link-page link">Menu</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/order" class="link-page link">Your order</router-link></div>
        </nav>
        
      </div>
      <div class="tabletNumber" name="tabletNumber">{{$store.state.app.TabletNumber}}</div>
      <div class="language" name="language" @click="changeLanguage()" v-if="$store.state.settings.showLanguageToggle">{{$store.state.settings.language}}</div>
      </div>
      <div class="content">
      
      <router-view class="view"></router-view>
      </div>
      <modal-anketa v-if="this.$store.state.app.showModalAnketa" @close="closeModal()"  closeBtn="true" />
      <modal-actions v-if="this.$store.state.app.showModalActions" @close="closeModalActions()"  :isModal="true" />
    </div>`
}).$mount('#app');

/*let updateInterval = setInterval(function () {
 upState();
 }, state.settings.updateStatePeriod);*/




