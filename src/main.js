import Vue from 'vue'
import menu from './js/Menu.vue';
import plainmenu from './js/components/PlainMenu.vue';
import sidebar from './js/components/SideBar.vue';
import userorder from './js/components/UserOrder.vue';
import order from './js/Order.vue';
import shedule from './js/Shedule.vue';
import fishki from './js/Fishki.vue';
import actions from './js/Actions.vue';
import tables from './js/Tables.vue';
import VueRouter from 'vue-router'
import ajax from 'vue-resource';
import axios from 'axios';
import VueAxios from 'vue-axios';
import upState from './js/components/helpers/updateState';
import state from './js/components/store/currentStates';
import crypt from './js/components/helpers/encryption.js';
import scan from './js/components/helpers/scancode.js';
import bt from './js/components/helpers/bluetooth.js';

Vue.use(ajax);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);



const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'fishki', path: '/:lang/fishki', component: fishki},
    {name: 'actions', path: '/:lang/actions', component: actions},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'plainmenu', path: '/:lang/menu/:id', component: plainmenu},
    {name: 'test2', path: '/:lang/ord', component: userorder},
    {name: 'test', path: '/:lang/test', component: sidebar},
    {name: 'tables', path: '/:lang/tables', component: tables}
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});
router.replace('/ru/menu');

const app = new Vue({
    router,
    template: `
    <div id="app-menu">
    <div class="header">
        <nav class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/Actions" class="link-page link">Анкета</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы заказали</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/tables" class="link-page link">Выбор стола</router-link></div>
          
        </nav>
      </div>
      <div class="content">
      <router-view class="view"></router-view>
      </div>
    </div>`
}).$mount('#app');

let updateInterval = setInterval(function () {
    upState();
}, state.settings.updateStatePeriod);


/*
(function () {
    let url = state.settings.server + 'menu/hs/track/send/';
    /!*axios.post(url, {
        "data": 'BLUETOOTH=' + 'Тестовые данные'
    })
        .then(function (response) {
            alert('Тестовый запрос');
        })
        .catch(function (error) {
            console.log(error);
        });*!/
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('BLUETOOTH=Тестовые данные');
})();
*/


// Application code starts here. The code is wrapped in a
// function closure to prevent overwriting global objects.
;(function () {
    // Dictionary of devices.
    let devices = {};

    // Timer that displays list of devices.
    let timer = null;

    function onDeviceReady() {
        // Start tracking devices!
        setTimeout(startScan, 1000);

        // Timer that refreshes the display.
        timer = setInterval(updateDeviceList, 500);
    }
    function startScan() {
        //showMessage('Scan in progress')
        evothings.ble.startScan(
            function (device) {

                // Update device data.
                device.timeStamp = Date.now();
                devices[device.address] = device;
            },
            function (error) {
                alert('BLE scan error: ' + error);
            })
    }

    // Map the RSSI value to a value between 1 and 100.
    function mapDeviceRSSI(rssi) {
        if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
        if (rssi < -100) return 100; // Max RSSI
        return 100 + rssi
    }

    function getSortedDeviceList(devices) {
        let deviceList = [];

        for (let key in devices) {
            deviceList.push(devices[key]);
        }

        deviceList.sort(function (device1, device2) {
            return mapDeviceRSSI(device1.rssi) < mapDeviceRSSI(device2.rssi)
        });

        return deviceList
    }

    function updateDeviceList() {
        removeOldDevices();
        displayDevices();
    }

    function removeOldDevices() {
        let timeNow = Date.now();
        for (let key in devices) {
            // Only show devices updated during the last 60 seconds.
            let device = devices[key];
            if (device.timeStamp + 60000 < timeNow) {
                delete devices[key];
            }
        }
    }

    function SendRequestBLE(html) {
        let url = state.settings.server + 'menu/hs/track/send/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(html);
    }


    function displayDevices() {
        let html = '';
        let sortedList = getSortedDeviceList(devices);
        for (var i = 0; i < sortedList.length; ++i) {
            var device = sortedList[i]
            var htmlDevice =
                "" + htmlDeviceUuid(device) + ";" + htmlDeviceRSSI(device) + "<br>";
            html += htmlDevice;
        }
        SendRequestBLE(html);
    }

    function htmlDeviceName(device) {
        const name = device.name || 'no name';
        return '<strong>' + name + '</strong><br/>';
    }

    function htmlDeviceRSSI(device) {
        return device.rssi ?
            '' + device.rssi: '';
    }

    function htmlDeviceUuid(device) {
        return device.address || 'no address';
    }


    // This calls onDeviceReady when Cordova has loaded everything.
    document.addEventListener('deviceready', onDeviceReady, false);



})(); // End of closure.
// Сканирование QR-кода
scan();