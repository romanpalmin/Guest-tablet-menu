export default function InsertData(key, value){
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady () {
        //window.localStorage.removeItem(key);
        /*if (key==='small'){
            alert('Перед сохранением ' + value);
        }*/
        //alert('Ключ: ' + key);
        window.localStorage.setItem(key, value);
    }
}