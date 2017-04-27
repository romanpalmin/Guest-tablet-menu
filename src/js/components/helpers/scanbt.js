export default function scanBLE() {
    let isPressedUp = false;

    let interval = 1200;
    let maxInterval = 3000;
    let maxClicks = 4;
    let clicks = 0;

    addEventListener("keydown", function (event) {
        let cnt = 0;

        if (event.keyCode === 38) {
            clicks++;
            let timerId = setInterval(function () {
                cnt += 1000;
                if (clicks >= maxClicks) {
                    startBLE();
                    stopWaiting();
                }
                if (cnt === maxInterval) {
                    stopWaiting();
                }
                function stopWaiting() {
                    isPressedUp = false;
                    cnt = 0;
                    clicks = 0;
                    clearInterval(timerId);
                }
            }, interval);
        }
    });

    function startBLE() {
        //alert('BLE. Pressed 4 timed');
    }

    document.addEventListener("volumeupbutton", function () {
        let cnt = 0;
        clicks++;
        let timerId = setInterval(function () {
            cnt += 1000;
            if (clicks === maxClicks) {
                startBLE();
                stopWaiting();
            }
            if (cnt === maxInterval) {
                stopWaiting();
            }
            function stopWaiting() {
                isPressedUp = false;
                cnt = 0;
                clicks = 0;
                clearInterval(timerId);
            }
        }, interval);
    }, false);
}