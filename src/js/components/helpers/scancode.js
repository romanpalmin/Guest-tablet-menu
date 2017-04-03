import rebind from './rebindTable.js';
export default function scanQrCode(router) {
    let isPressedUp = false;
    let isPressedDown = false;
    let isPressedBack = false;
    let interval = 200;
    let maxInterval = 4000;
    const isDebug = false;
    const self = this;

    addEventListener("keydown", function (event) {
            let cnt = 0;
            if (event.keyCode === 38) {
                isPressedUp = true;
                let timerId = setInterval(function () {
                    cnt += 1000;
                    if (isPressedBack) {
                        startTestScan();
                        stopWaiting();
                    }
                    if (cnt === maxInterval) {
                        stopWaiting();
                    }
                    function stopWaiting() {
                        isPressedUp = false;
                        isPressedBack = false;
                        cnt = 0;
                        clearInterval(timerId);
                    }
                }, interval);
            }
            if (event.keyCode === 40) {
                isPressedDown = true;
                let timerId = setInterval(function () {
                    cnt += 1000;
                    if (isPressedBack) {
                        goToTables();
                        stopWaiting();
                    }
                    if (cnt === maxInterval) {
                        stopWaiting();
                    }
                    function stopWaiting() {
                        isPressedDown = false;
                        isPressedBack = false;
                        cnt = 0;
                        clearInterval(timerId);
                    }
                }, interval);
            }
        }
    );
    addEventListener("click", function () {
        let cnt = 0;
        isPressedBack = true;
        let timerId = setInterval(function () {
            cnt += 1000;
            if (cnt === maxInterval) {
                isPressedBack = false;
                clearInterval(timerId);
            }
        }, interval);
    });

    document.addEventListener("volumeupbutton", function () {
        let cnt = 0;
        isPressedUp = true;
        let timerId = setInterval(function () {
            cnt += 1000;
            if (isPressedBack) {
                /*if (isDebug) {
                    startTestScan();
                }
                else {
                    startScan();
                }*/
                startScan();
                stopWaiting();
            }
            if (cnt === maxInterval) {
                stopWaiting();
            }
            function stopWaiting() {
                isPressedUp = false;
                isPressedBack = false;
                cnt = 0;
                clearInterval(timerId);
            }
        }, interval);
    }, false);

    document.addEventListener("volumedownbutton", function () {
        let cnt = 0;
        isPressedDown = true;
        let timerId = setInterval(function () {
            cnt += 1000;
            if (isPressedBack) {
                goToTables();
                stopWaiting();
            }
            if (cnt === maxInterval) {
                stopWaiting();
            }
            function stopWaiting() {
                isPressedDown = false;
                isPressedBack = false;
                cnt = 0;
                clearInterval(timerId);
            }
        }, interval);
    }, false);

    document.addEventListener("backbutton", function () {
        let cnt = 0;
        isPressedBack = true;
        let timerId = setInterval(function () {
            cnt += 1000;
            if (cnt === maxInterval) {
                isPressedBack = false;
                clearInterval(timerId);
            }
        }, interval);
    }, false);

    function startTestScan() {
        alert('Запускаем тестовое сканирование');
    }

    function goToTables() {
        router.replace('/ru/tables');
    }

    function startScan() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled && result.format == 'CODE_93') {
                    rebind.rebind(result.text);
                }
                alert("Получен штрих код: \n" +
                    "Значение: " + result.text + "\n" +
                    "Формат: " + result.format + "\n" +
                    "Отменен: " + result.cancelled);
            },
            function (error) {
                alert("Ошибка сканирования: " + error);
            });
    }
}