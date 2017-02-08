import Vue from 'vue'
import menu from './js/views/Menu.vue';
import sidebar from './js/views/components/sidebar.vue';
import order from './js/views/Order.vue';
import shedule from './js/views/Shedule.vue';
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
    {name: 'order', path: '/:lang/fishki', component: order},
    {name: 'order', path: '/:lang/actions', component: order},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'sidebar', path: '/:lang/menu/:id', component: sidebar}
];

var router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});


const app = new Vue({
    router,
    template: `
    <div id="app-menu">
    <div class="header">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/fishki" class="link-page link">Фишки</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/actions" class="link-page link">Акции</router-link></div>
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