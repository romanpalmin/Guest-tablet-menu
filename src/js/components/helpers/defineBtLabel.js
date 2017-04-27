//import state from '../store/currentStates';
import store from '../../../store';
import _ from 'lodash';
export default function() {
    // Dictionary of devices.
    let devices = {};
    let cntDevArr = [];
    // Timer that displays list of devices.
    let timer = null;

    function onDeviceReady() {
        // Start tracking devices!
        setTimeout(startScan, 1000);

        // Timer that refreshes the display.
        timer = setInterval(updateDeviceList, 500);
    }

    function startScan() {
        //showMessage('Scan in progress')
        evothings.ble.startScan(
            function (device) {

                // Update device data.
                device.timeStamp = Date.now();
                devices[device.address] = device;
            },
            function (error) {
                alert('BLE scan error: ' + error);
            })
    }

    // Map the RSSI value to a value between 1 and 100.
    function mapDeviceRSSI(rssi) {
        if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
        if (rssi < -100) return 100; // Max RSSI
        return 100 + rssi
    }

    function getSortedDeviceList(devices) {
        let deviceList = [];

        for (let key in devices) {
            deviceList.push(devices[key]);
        }

        deviceList.sort(function (device1, device2) {
            return mapDeviceRSSI(device1.rssi) < mapDeviceRSSI(device2.rssi)
        });

        return deviceList
    }

    function updateDeviceList() {
        removeOldDevices();
        displayDevices();
    }

    function removeOldDevices() {
        let timeNow = Date.now();
        for (let key in devices) {
            // Only show devices updated during the last 60 seconds.
            let device = devices[key];
            if (device.timeStamp + 60000 < timeNow) {
                delete devices[key];
            }
        }
    }

    function SendRequestBLE(html) {
        let url = store.state.settings.server + 'menu/hs/track/send/';
        console.log(url);
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(html);
    }


    function displayDevices() {
        let html = '';
        let devArr = [];
        let sortedList = getSortedDeviceList(devices);
        for (let i = 0; i < sortedList.length; ++i) {
            let device = sortedList[i];
            let htmlDevice = "" + htmlDeviceUuid(device) + ";" + htmlDeviceRSSI(device) + "<br>";
            html += htmlDevice;
            let dev = {BLE: htmlDeviceUuid(device), rssi: htmlDeviceRSSI(device)};
            devArr.push(dev);
            if (i === sortedList.length - 1) {
                if (cntDevArr.length < 5) {
                    cntDevArr.push(devArr);
                } else {
                    cntDevArr.unshift((devArr));
                    cntDevArr.pop();
                }

                if (cntDevArr.length === 5) {
                    DefineTableNumber(cntDevArr);
                }
            }
        }
        SendRequestBLE(html);
    }

    function DefineTableNumber(arr) {
        let tableNumber;
        let resultObjArr = [];
        let currentAvailablesArrays = [];
        let curArray = [];
        let result;
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr[i].length; k++) {
                curArray.push({'BLE': arr[i][k].BLE, 'rssi': arr[i][k].rssi});
            }
            currentAvailablesArrays.push(intersectionArray(curArray));
        }
        currentAvailablesArrays.forEach(function(item){
            let currentMax = _.max(item, 'rssi');
            resultObjArr.push(currentMax);
        });

        result = _.uniqBy(resultObjArr, 'rssi' && 'BLE');
        result =_.max(result, 'rssi');

        tableNumber = (_.find(store.state.app.BleLabels, {'BLE' : result.BLE})).table;
        alert(tableNumber);
        store.commit('SET_PRIMARY_TABLE_NUMBER', tableNumber);

    }

    function intersectionArray(arr) {
        return _.intersectionBy(arr, store.state.app.BleLabels, 'BLE');

    }

    function htmlDeviceName(device) {
        const name = device.name || 'no name';
        return '<strong>' + name + '</strong><br/>';
    }

    function htmlDeviceRSSI(device) {
        return device.rssi ?
            '' + device.rssi : '';
    }

    function htmlDeviceUuid(device) {
        return device.address || 'no address';
    }


    // This calls onDeviceReady when Cordova has loaded everything.
    document.addEventListener('deviceready', onDeviceReady, false);
}