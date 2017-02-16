import state from '../store/currentStates';
import axios from 'axios';
const ip = state.settings.ip;
const server = `${ip}/`;
const user = 'tab01';
const password = '01';
const baseUrl = '/menu/hs/model?';
var ajaxServerUrlShort = `http://${user}:${password}@${server}${baseUrl}`;

function getCategories(url, callback) {
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

function getPositionsList(url, callback){
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
        return getCategories(url, callback);
    },
    getPositions: function(url, callback){
        return getPositionsList(url, callback);
    }
};