import Vue from 'vue'
import menu from './js/views/Menu.vue';
import site from './js/views/Site.vue';
import order from './js/views/Order.vue';
import shedule from './js/views/Shedule.vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const routes = [
    {path: '/menu', component: menu},
    {path: '/site', component: site},
    {path: '/order', component: order},
    {path: '/shedule', component: shedule}
];

var router = new VueRouter({
    linkActiveClass: 'active-page-delete',
    routes

});

router.afterEach((to, from) => {
    var link = document.getElementsByClassName('active-page-delete');
    console.log(link);
    if (link.length > 0) {
        console.log(222);
        link[0].addEventListener('click', function () {
            router.push('menu');
            console.log(1);
        });
    }

});

/* Bootstrap routes to the main component */
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