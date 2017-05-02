//import state from '../store/currentStates';
import axios from 'axios';
import crypt from './encryption.js';
import store from './../../../store';
const ip = '10.100.50.248';
let userName = 'planshet';
let password = 'planshet';
let ajaxServerUrlShort = '';
const baseUrl = 'menu/hs/model?';
//-------------------------------
ajaxServerUrlShort = formAjaxVars();


let uuid = '';
if (typeof device !== 'undefined') {
    uuid = device.uuid;
    //alert(device.uuid);
    getTabletName(uuid);
} else {
    uuid = '10e00be6a70f0bcc';
    getTabletName(uuid);
}


function getTabletName(uuid) {
    const operation = {name: 'getUserName', uuid: uuid};
    let url = getUrl(operation);
    executeRequest(url, function (resp) {
        userName = resp.data.login;
        password = resp.data.pass;
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
            url = 'groups=342020&delcart=1&tovar=1';
            break;
        case 'deleteFromOrder':
            url = `groups=342020&tovar=${operation.id}&dellcartitem=${operation.stroka}`;
            break;
        case 'addToOrder':
            url = `groups=1&addcart=1&tovar=${operation.positionId}&table=${operation.tableId}`;
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
            console.log(operation);
            console.warn('Для работы заменить no_groups на groups');
            url = `no_groups=1&tovar=1&yacheika=${operation.id}`;
            console.log(url);
            break;
        case 'getUserName':
            url = 'usr=1';
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