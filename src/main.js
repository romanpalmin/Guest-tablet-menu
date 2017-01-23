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
    routes
});

const app = new Vue({
    router,
    template: `
    <div id="app-menu">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/site"><a class="link-page link">Сайт</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/shedule"><a class="link-page link">Развлечения</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/menu"><a class="link-page link">Меню</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/order"><a class="link-page link">Заказ</a></router-link></div>
        </nav>
      <router-view class="view" @eventname="console.log(123);"></router-view>
    </div>`
}).$mount('#app');