export default function GetData(key, callback){
    var res = '';

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady () {
       res = window.localStorage.getItem(key);
        if (callback && typeof(callback) === "function") {
            callback(res);
        }
    }
}