import state from '../store/currentStates';
import axios from 'axios';

const ip = state.settings.ip;
const server = `${ip}/`;
const user = 'tab01';
const password = '01';
const baseUrl = '/menu/hs/model?';
var ajaxServerUrlShort = `http://${user}:${password}@${server}${baseUrl}`;

function executeSimpleRequest(url, callback) {
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

function getUrl(operation){
    let url = '';
    switch (operation.name){
        case 'categories':
            console.log(operation);
            url = 'groups=';
            break;
        case 'positions':
            console.log(operation);
            url = `groups=${operation.catId}&category=${operation.catId}`;
            break;
        case 'show':
            console.log(operation);
            url = 'groups=1&shows=1';
            break;
        case 'order':
            console.log(operation);
            url = 'groups=1&korzina=1';
            break;
        case 'clearOrder':
            console.log(operation);
            url = 'groups=342020&delcart=1&tovar=1';
            break;
        case 'deleteFromOrder':
            console.log(operation);
            url = `groups=342020&tovar=${operation.id}&dellcartitem=${operation.stroka}`;
            break;
        case 'addToOrder':
            console.log(operation);
            url = `groups=1&addcart=1&tovar=${operation.positionId}`;
            break;
        default:
            url = '';
            break;
    }
    return url;
}

export default {
    exec: function(operation, callback){
        let url = getUrl(operation);
        return executeSimpleRequest(url, callback);
    },

    getCategories: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    getPositions: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    getShow: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    getOrders: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    
    deleteFromOrder: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    
    clearOrder: function(url, callback){
        return executeSimpleRequest(url, callback);
    },
    
    addToOrder: function(url, callback){
        return executeSimpleRequest(url, callback);
    }
};