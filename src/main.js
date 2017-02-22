import Vue from 'vue'
import menu from './js/Menu.vue';
import plainmenu from './js/components/PlainMenu.vue';
import sidebar from './js/components/SideBar.vue';
import userorder from './js/components/UserOrder.vue';
import order from './js/Order.vue';
import shedule from './js/Shedule.vue';
import fishki from './js/Fishki.vue';
import actions from './js/Actions.vue';
import VueRouter from 'vue-router'
import ajax from 'vue-resource';
import axios from 'axios';
import VueAxios from 'vue-axios';
import upState from './js/components/helpers/updateState';
import state from './js/components/store/currentStates';

Vue.use(ajax);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

/*Vue.axios.get('settings.json')
 .then(function (response) {
 console.log(response);
 cs.server = response.data.server;
 cs.urlSmallImage = response.data.server + response.data.smallImagesUrl;
 cs.urlBigImage = response.data.server + response.data.bigImagesUrl;
 console.log(cs);
 })
 .catch(function (error) {
 console.log(error);
 });*/


const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'fishki', path: '/:lang/fishki', component: fishki},
    {name: 'actions', path: '/:lang/actions', component: actions},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'plainmenu', path: '/:lang/menu/:id', component: plainmenu},
    {name: 'test2', path: '/:lang/ord', component: userorder},
    {name: 'test', path: '/:lang/test', component: sidebar}
];

var router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});
router.replace('/:lang/menu');
/*
 row.client = item[index].client;
 row.code = item[index].code;
 row.name = item[index].name;
 row.stroka = strArray;
 res.push(row);
 */
const app = new Vue({
    router,
    template: `
    <div id="app-menu">
    <div class="header">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/actions" class="link-page link">Акции</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
          
        </nav>
      </div>
      <div class="content">
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');

let updateInterval = setInterval(function(){
    upState();
}, state.settings.updateStatePeriod);