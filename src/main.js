import Vue from 'vue'
import menu from './js/views/Menu.vue';
import sidebar from './js/views/components/sidebar.vue';
import site from './js/views/Site.vue';
import order from './js/views/Order.vue';
import shedule from './js/views/Shedule.vue';
import VueRouter from 'vue-router'
import ajax from 'vue-resource';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(ajax);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);



const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'site', path: '/:lang/site', component: site},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'sidebar', path: '/:lang/menu/:id', component: sidebar}
];

var router = new VueRouter({
    routes,
    linkActiveClass:'menu__link--current'
});

console.log('Что-нибудь загрузим через аякс');

const app = new Vue({
    router,
    template: `
    <div id="app-menu">
    <div class="header">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Фишки</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Акции</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы выбрали</router-link></div>
        </nav>
      </div>
      <div class="content">
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');