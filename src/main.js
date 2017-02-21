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
import axios from 'axios'
import VueAxios from 'vue-axios'

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


var no_active_delay = 100000;
var now_no_active = 0;
var interval = setInterval(function () {
    now_no_active++;
    if (now_no_active >= 100) {
        now_no_active = no_active_delay + 1;
    }
}, 1000);

setInterval(function () {
    checkForActivity()
}, 1000); // Запускаем функцию updateChat() через определённый интервал

document.onmousemove = UserActions; // Ставим обработчик на движение курсора мыши

function UserActions() {
    now_no_active = 0; // Обнуляем счётчик простоя секунд
}
function checkForActivity() {
    if (now_no_active >= no_active_delay) { // Проверяем не превышен ли "предел активности" пользователя
        console.log('Система не активна более ' + no_active_delay + ' секунд, скрываем приложение');
        document.getElementById('app-menu').style.display = 'none';
    }
    if (document.getElementById('app-menu').style.display === 'none' && now_no_active < no_active_delay) {
        document.getElementById('app-menu').style.display = 'block';
        router.replace('/:lang/menu');
    }
}