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

export default {
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
    }
};