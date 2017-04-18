import state from '../store/currentStates';
import axios from 'axios';
import crypt from './encryption.js';

const ip = state.settings.ip;
const server = `${ip}/`;
const user =  state.settings.userName;
const password = state.settings.password;
const baseUrl = '/menu/hs/model?';
let ajaxServerUrlShort = `http://${user}:${password}@${server}${baseUrl}`;

function executeRequest(url, callback) {
    axios.get(ajaxServerUrlShort + url)
        .then(function (response) {
            if (callback && typeof(callback) === "function"){
                callback(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

if (typeof device !== 'undefined') {
    uuid = device.uuid;
    //alert(device.uuid);
} else {
    uuid = '10e00be6a70f0bcc'
}

function getUrl(operation){
    let url = '';
    switch (operation.name){
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
            url = `groups=1&addcart=1&tovar=${operation.positionId}`;
            break;
        case 'showLamp':
            console.log(operation);
            console.warn('Для работы заменить no_groups на groups');
            url = `no_groups=1&tovar=1&yacheika=${operation.id}`;
            break;
        default:
            url = '';
            break;
    }
    return url !== '' ? url + '&uuid=' + crypt(state.settings.cryptoword) : '';
}

export default {
    exec: function(operation, callback){
        let url = getUrl(operation);
        return executeRequest(url, callback);
    }
};