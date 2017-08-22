//import state from '../store/currentStates';
import axios from 'axios';
import crypt from './encryption.js';
import store from './../../../store';
const ip = '10.100.50.248';
/*const ip = '10.10.182.11';*/
let userName = 'planshet';
let password = 'planshet';
let ajaxServerUrlShort = '';
//const baseUrl = 'planshet_kl/hs/model?';
/*const baseUrl = 'planshet/hs/model?';*/
const baseUrl = ip === '10.10.182.11'
    ? 'planshet/hs/model?'
    : 'planshet_kl/hs/model?';
//-------------------------------
//ajaxServerUrlShort = formAjaxVars(true);

let uuid = '';
//uuid = device.uuid;
//uuid = '3b2b1bd559196f59';
//uuid = 'ea21a93f02109be8';
//uuid = '46ef10b07fa3cad9'; //3
//uuid = '490068b9338eea9c';
//uuid = 'c27c861fab683dcd';
//uuid = '494d05724a3d7688';
//uuid =  '3b2b1bd559196f59';
//uuid =  '2557df93e17f7288';
//uuid =  '9bc37bed67d4cf7e'; //9
//uuid =  '2b060b59ed273131';
//uuid = 'fdc7697a287247f0';
//uuid =  '53231867523ce1aa'; //12
//uuid = '1743e59ace719495';
//uuid = 'daf7a703c6cbfd7a';
//uuid = 'fa5b3417d9decf2f';
//uuid = 'eaf312bc8abf4ed3'; //16
//uuid = 'abf0d81fe87907f8';
//uuid = 'ef8b387be60f6836';
//uuid = 'aa1f0cdb05ef2b84';
//uuid = 'f0dea5970b395623'; //20
//uuid = '5c9c6090b21ba65d';
//uuid =  'e27b802ce6ea0714';
//uuid = '3ceeea2b59b7fe2';
//uuid = 'c84ca9da1d5513e9'; //24
//uuid = 'cd2cd1a74592978f';
//uuid = '3a59fc9cd013635b';
//uuid =  '1c41da3b9be38d71';
//uuid = '9ac05e4ade5e8ee6'; //28
//uuid = '500e21a659a4c148';
//uuid = '6ed61e64db893b10';
//uuid = 'c3efb3a8f65ddf9b'; //31
//uuid = 'b75b32a46dcb32c4';
//uuid = '7e59b6ef2412e6d9';
//uuid = '854dbb0f2fdac46c';
//uuid = '10e00be6a70f0bcc';
//uuid = '8981e83c79f3be00';
//getTabletName(uuid);
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    if (typeof device !== 'undefined') {
        uuid = device.uuid;
        getTabletName(uuid);
    } else {
        userName = 'tab01';
        password = '01';
    }
}

function getTabletName(uuid) {
    const operation = {name: 'getUserName', uuid: uuid};
    let url = getUrl(operation);
    //let url = `http://${userName}:${password}@${ip}/${baseUrl}` +  'usr=1' + '&uuid=' + crypt(uuid);;
    executeRequest(url, function (resp) {
        userName = resp.data.login;
        password = resp.data.pass;
        store.commit('SET_TABLET_NUMBER', password);
        formAjaxVars(true);
    });
}

function formAjaxVars(isBaseUrl) {
    if (isBaseUrl) {
        ajaxServerUrlShort = `http://${userName}:${password}@${ip}/${baseUrl}`;
    } else {
        ajaxServerUrlShort = `http://${userName}:${password}@${ip}/`;
    }

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
            if (callback && typeof(callback) === "function") {
                callback(
                    {
                        'data': {
                            'code': 'error',
                            'message': error.message
                        }
                    });
            }
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
        case 'sendPhone':
            url = `freeDinner=${operation.phone}`;
            break;
        case 'getActions':
            url = `stock=1`;
            break;
        default:
            url = '';
            break;
    }
    return url !== '' ? url + '&uuid=' + crypt(uuid) + language : '';
}

export default {
    exec: function (operation, callback) {
        let url = '';
        let preffix = '';
        if (operation.name === 'sendAnketa') {
            formAjaxVars(false);
            preffix = ip === '10.10.182.11' ? 'planshet/' : 'planshet_kl/';
            url = preffix + 'hs/ank1/send?' + operation.value + '=1' + '&phone=' + operation.phone + '&uuid=' + crypt(uuid);
        } else {
            formAjaxVars(true);
            url = getUrl(operation);
        }

        return executeRequest(url, callback);
    }
};