import Vue from 'vue'
import menu from './js/views/Menu.vue';
import sidebar from './js/views/components/sidebar.vue';
import site from './js/views/Site.vue';
import order from './js/views/Order.vue';
import shedule from './js/views/Shedule.vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const routes = [
    {name: 'menu', path: '/menu', component: menu},
    {name: 'site', path: '/site', component: site},
    {name: 'order', path: '/order', component: order},
    {name: 'shedule', path: '/shedule', component: shedule},
    {name: 'sidebar', path: '/menu/:id', component: sidebar}
];

var router = new VueRouter({
    routes,
    linkActiveClass:'menu__link--current'
});

const app = new Vue({
    router,
    template: `
    <div id="app-menu">
    <div class="header">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/site" class="link-page link">Сайт</router-link></div>
            <div class="pages-nav__item "><router-link to="/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/order" class="link-page link">Вы выбрали</router-link></div>
        </nav>
      </div>
      <div class="content">
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');