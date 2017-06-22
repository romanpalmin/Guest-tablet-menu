// Функции работы с энергосбережением планшета
export default function () {
    function onDeviceReady(){
        window.powerManagement.acquire(function() {
            console.log('Wakelock acquired');
        }, function() {
            console.log('Failed to acquire wakelock');
        });
    }

    document.addEventListener('deviceready', onDeviceReady, false);
};