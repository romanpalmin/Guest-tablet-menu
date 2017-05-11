export default function checkFileList(callback) {
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        var myPath = cordova.file.externalRootDirectory + 'StreetFoodBar/images';

        window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
            var directoryReader = dirEntry.createReader();
            directoryReader.readEntries(onSuccessCallback, onFailCallback);
        });

        function onSuccessCallback(entries) {
            alert(entries);
        }

        function onFailCallback() {
            // In case of error
        }
    }
}