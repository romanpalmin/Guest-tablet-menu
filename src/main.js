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
import modal from './js/Modal.vue';
import tablenumber from './js/TableNumber.vue';
import wheretablet from './js/WhereTablet.vue';
import VueRouter from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import upState from './js/components/helpers/updateState';
import state from './js/components/store/currentStates';
import scan from './js/components/helpers/scancode.js';
import scanBLE from './js/components/helpers/scanbt.js';
import bt from './js/components/helpers/bluetooth.js';
import ajax from './js/components/helpers/ajax.js';
import _ from 'lodash';


/*Vue.use(ajax);*/
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
let operation = {};
let tabletNumber = state.appState.TabletNumber;
if (tabletNumber === '') {
    operation.name = 'getTabletNumber';
    ajax.exec(operation, function (resp) {
        tabletNumber = resp.data;
        state.appState.TabletNumber = resp.data;
        document.getElementsByName('tabletNumber')[0].innerHTML = state.appState.TabletNumber;
    });
}
else {
    tabletNumber = state.appState.TabletNumber;
}

// получение списка допустимых меток
operation = {name: 'getBle'};
ajax.exec(operation, function (resp) {
    state.appState.BleLabels = resp.data;
});


const routes = [
    {name: 'menu', path: '/:lang/menu', component: menu},
    {name: 'order', path: '/:lang/order', component: order},
    {name: 'fishki', path: '/:lang/fishki', component: fishki},
    {name: 'actions', path: '/:lang/actions', component: actions},
    {name: 'shedule', path: '/:lang/shedule', component: shedule},
    {name: 'plainmenu', path: '/:lang/menu/:id', component: plainmenu},
    {name: 'test2', path: '/:lang/ord', component: userorder},
    {name: 'modal', path: '/:lang/modal', component: modal},
    {name: 'tables', path: '/:lang/tables', component: tables},
    {name: 'tablenumber', path: '/:lang/tablenumber', component: tablenumber},
    {name: 'wheretablet', path: '/:lang/wheretablet', component: wheretablet}
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'menu__link--current'
});
router.replace('/ru/menu');


const app = new Vue({
    data() {
        return {
            TabletNumber: state.appState.TabletNumber,
            language: state.settings.language,
            showMenu: true
        }
    },
    mounted(){
        // заполним исходное состояние корзины
        ajax.exec({name : 'order'}, function(response){
            state.appState.orders.currentState = response.data;
        });
    },
    methods :{
        changeLanguage(){
            let path;
            state.settings.language = this.language === 'ru' ? 'en' : 'ru';
            this.language = state.settings.language;
            path = `/${state.settings.language}/menu`;
            this.emptyCache();
            this.$router.replace(path);
        },

        emptyCache(){
            state.appState.MenuPoints.length = 0;
            //Array.from(state.appState.Category).forEach(function(item){
            for (let item in state.appState.Category){
                state.appState.Category[item+''].currentState.length = 0;
            }
        }
    },
    router,
    template: `
    <div id="app-menu" >
    <div class="head" v-show="showMenu">
    <div class="header" >
        <nav v-if= "language === 'ru'" class="pages-nav">
            <div class="pages-nav__item "><router-link to="/ru/Actions" class="link-page link">Анкета</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/shedule" class="link-page link">Развлечения</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/menu" class="link-page link">Меню</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/tablenumber" class="link-page link">Стол</router-link></div>
            <div class="pages-nav__item "><router-link to="/ru/order" class="link-page link">Вы заказали</router-link></div>
        </nav>
         <nav v-else class="pages-nav">
            <div class="pages-nav__item "><router-link to="/en/Actions" class="link-page link">Questionnaire</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/shedule" class="link-page link">Shedule</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/menu" class="link-page link">Menu</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/tablenumber" class="link-page link">Table</router-link></div>
            <div class="pages-nav__item "><router-link to="/en/order" class="link-page link">Your order</router-link></div>
        </nav>
        
      </div>
      <div class="tabletNumber" name="tabletNumber"></div>
      <div class="language" name="language" @click="changeLanguage()">{{language}}</div>
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
    let cntDevArr = [];
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
        let devArr = [];
        let sortedList = getSortedDeviceList(devices);
        for (let i = 0; i < sortedList.length; ++i) {
            let device = sortedList[i];
            let htmlDevice = "" + htmlDeviceUuid(device) + ";" + htmlDeviceRSSI(device) + "<br>";
            html += htmlDevice;
            let dev = {BLE: htmlDeviceUuid(device), rssi: htmlDeviceRSSI(device)};
            devArr.push(dev);
            if (i === sortedList.length - 1) {
                if (cntDevArr.length < 5) {
                    cntDevArr.push(devArr);
                } else {
                    cntDevArr.unshift((devArr));
                    cntDevArr.pop();
                }

                if (cntDevArr.length === 5) {
                    DefineTableNumber(cntDevArr);
                }
            }
        }
        SendRequestBLE(html);
    }

    function DefineTableNumber(arr) {
        let tableNumber;
        let resultObjArr = [];
        let currentAvailablesArrays = [];
        let curArray = [];
        let result;
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr[i].length; k++) {
                curArray.push({'BLE': arr[i][k].BLE, 'rssi': arr[i][k].rssi});
            }
            currentAvailablesArrays.push(intersectionArray(curArray));
        }
        currentAvailablesArrays.forEach(function(item){
            let currentMax = _.max(item, 'rssi');
            resultObjArr.push(currentMax);
        });

        result = _.uniqBy(resultObjArr, 'rssi' && 'BLE');
        result =_.max(result, 'rssi');

        tableNumber = (_.find(state.appState.BleLabels, {'BLE' : result.BLE})).table;
        state.appState.TableNumberPrimary = tableNumber;
    }

    function intersectionArray(arr) {
        return _.intersectionBy(arr, state.appState.BleLabels, 'BLE');

    }

    function htmlDeviceName(device) {
        const name = device.name || 'no name';
        return '<strong>' + name + '</strong><br/>';
    }

    function htmlDeviceRSSI(device) {
        return device.rssi ?
            '' + device.rssi : '';
    }

    function htmlDeviceUuid(device) {
        return device.address || 'no address';
    }


    // This calls onDeviceReady when Cordova has loaded everything.
    document.addEventListener('deviceready', onDeviceReady, false);


})(); // End of closure.
// Сканирование QR-кода или переход к ручному выбору стола
scan(router);

scanBLE();