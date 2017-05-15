export default function GetData(key){
    var res = '';

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady () {
       res = window.localStorage.getItem(key);
       alert('Результат: ' + res);
       return res;
    }
}