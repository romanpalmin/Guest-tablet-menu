export default function InsertData(key, value){
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady () {
        //window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
    }
}