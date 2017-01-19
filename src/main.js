import Vue from 'vue'
import Menu from 'js/views/Menu.vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const routes = [
    {path: '/menu', component: Menu},
    {path: '/menu', component: Menu},
    {path: '/menu', component: Menu},
    {path: '/menu', component: Menu}
];

var router = new VueRouter({
    linkActiveClass: 'active-class',
    routes
});


/* Bootstrap routes to the main component */
const app = new Vue({
    router,
    template: `
    <div id="app">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/menu"><a class="link-page link">Сайт</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/menu"><a class="link-page link">Развлечения</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/menu"><a class="link-page link">Меню</a></router-link></div>
            <div class="pages-nav__item "><router-link to="/menu"><a class="link-page link">Вы выбрали</a></router-link></div>
        </nav>

      <router-view class="view"></router-view>
    </div>`
}).$mount('#app');