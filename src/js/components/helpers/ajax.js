//import state from '../store/currentStates';
import axios from 'axios';
import crypt from './encryption.js';
import store from './../../../store';
/*const ip = '10.10.250.82';*/
const ip = '10.100.50.248';
/*const ip = '10.10.182.11';*/
let userName = 'planshet';
let password = 'planshet';
let ajaxServerUrlShort = '';
const baseUrl = 'menu/hs/model?';
//-------------------------------
ajaxServerUrlShort = formAjaxVars();
//console.log('ip: ' + ip);

let uuid = '';
/*if (typeof device !== 'undefined') {
    uuid = device.uuid;
    //alert(device.uuid);
    getTabletName(uuid);
} else {
    uuid = '8981e83c79f3be00';
    getTabletName(uuid);
    //userName = 'tab01';
    //password = '01';
}*/

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
    if (typeof device !== 'undefined') {
        uuid = device.uuid;
        getTabletName(uuid);
    }
}

function getTabletName(uuid) {
    const operation = {name: 'getUserName', uuid: uuid};
    let url = getUrl(operation);
    executeRequest(url, function (resp) {
        userName = resp.data.login;
        password = resp.data.pass;
        store.commit('SET_TABLET_NUMBER', password);
        formAjaxVars();
    });
}

function formAjaxVars(){
    ajaxServerUrlShort = `http://${userName}:${password}@${ip}/${baseUrl}`;
    return ajaxServerUrlShort;
}


function executeRequest(url, callback) {
    axios.get(ajaxServerUrlShort + url)
        .then(function (response) {
            if (callback && typeof(callback) === "function") {
                callback(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getUrl(operation) {
    let url = '';
    let language = store.state.settings.language === 'en' ? '&lang=en' : '';
    switch (operation.name) {
        case 'categories':
            url = 'groups=';
            break;
        case 'positions':
            url = `groups=${operation.catId}&category=${operation.catId}`;
            break;
        case 'show':
            url = 'groups=1&shows=1';
            break;
        case 'order':
            url = 'groups=1&korzina=1';
            break;
        case 'clearOrder':
            url = 'groups=342020&category=&delcart=1&tovar=1';
            break;
        case 'deleteFromOrder':
            url = `groups=342020&category=&dellcartitem=${operation.stroka}`; // добавить код товара
            break;
            //deleteStringFromOrder
        case 'deleteStringFromOrder':
            url = `groups=1&category=&tovar=${operation.positionId}&dellcartstr=1`;
            break;
        case 'addToOrder':
            url = `groups=1&addcart=1&category=1&tovar=${operation.positionId}&table=${operation.tableId}`;
            break;
        case 'rebuildTable':
            url = `groups=1&addcart=1&rebuildtable=${operation.stringOfCodes}`;
            break;
        case 'getTabletNumber':
            url = `groups=&usr=1`;
            break;
        case 'getBle':
            url = `groups=&ble=1`;
            break;
        case 'whereTablets':
            url = `tablets=1`;
            break;
        case 'showLamp':
            url = `groups=1&tovar=1&yacheika=${operation.id}`;
            break;
        case 'getUserName':
            url = 'usr=1';
            break;
        case 'getLastTimeUpdate':
            url = 'sync=1';
            break;
        case 'getDataNew':
            url = 'groups=&category=&sync=&data=1';
            break;
        default:
            url = '';
            break;
    }
    return url !== '' ? url + '&uuid=' + crypt(uuid) + language : '';
}

export default {
    exec: function (operation, callback) {
        let url = getUrl(operation);
        return executeRequest(url, callback);
    }
};