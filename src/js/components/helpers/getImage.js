export default function getImage(fileName) {
    document.addEventListener('deviceready', onDeviceReady, false);

    function readFromFile(fileName, cb) {
        var pathToFile = cordova.file.externalRootDirectory + fileName;
        alert(pathToFile);
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    alert(e);
                };

                reader.readAsArrayBuffer(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    var fileData;
    readFromFile(fileName, function (data) {
        fileData = data;
        alert(fileData);
        console.log(fileData);
    });
}