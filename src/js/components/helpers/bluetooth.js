import state from '../store/currentStates';
export default {
    devices: {},
    timer: null,
    onDeviceReady: function() {
        console.log('Запуск сканирования эфира');
        // Start tracking devices!
        setTimeout(this.startScan, 1000);

        // Timer that refreshes the display.
        this.timer = setInterval(this.updateDeviceList, 500);


    },
    startScan: function() {
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
    },

    mapDeviceRSSI: function(rssi) {
        if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
        if (rssi < -100) return 100; // Max RSSI
        return 100 + rssi
    },

    getSortedDeviceList: function(devices) {
        let deviceList = [];
        for (let key in devices) {
            deviceList.push(devices[key]);
        }

        deviceList.sort(function (device1, device2) {
            return this.mapDeviceRSSI(device1.rssi) < this.mapDeviceRSSI(device2.rssi)
        });

        return deviceList
    },

    updateDeviceList: function() {
        this.removeOldDevices();
        this.displayDevices();
    },
    removeOldDevices: function() {
        let timeNow = Date.now();
        for (let key in devices) {
            // Only show devices updated during the last 60 seconds.
            let device = devices[key];
            if (device.timeStamp + 60000 < timeNow) {
                delete devices[key];
            }
        }
    },

    SendRequestBLE: function(html) {
        let url = state.settings.server + 'menu/hs/track/send/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(html);
    },
    displayDevices: function() {
        let html = '';
        let sortedList = this.getSortedDeviceList(devices);
        for (let i = 0; i < sortedList.length; ++i) {
            let device = sortedList[i];
            let htmlDevice = `${htmlDeviceUuid(device)};${htmlDeviceRSSI(device)}<br>`;
            html += htmlDevice;
        }
        this.SendRequestBLE(html);
    },

    htmlDeviceRSSI: function(device) {
        return device.rssi ?
            '' + device.rssi : '';
    },

    htmlDeviceUuid: function(device) {
        return device.address || 'no address';
    }
}