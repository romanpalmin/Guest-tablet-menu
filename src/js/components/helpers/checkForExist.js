export default function checkFile(fileName, callback) {

    var res = false;
    document.addEventListener('deviceready', onDeviceReady, false);
    var pathToFile = cordova.file.externalRootDirectory + fileName;
    function checkIfFileExists(path){
        // path is the full absolute path to the file.
        window.resolveLocalFileSystemURL(path, fileExists, fileDoesNotExist);
    }
    function fileExists(fileEntry){
        alert("File " + fileEntry.fullPath + " exists!");
        res = true;
        try {
            callback(res);
        }
        catch(e){
            alert(e.message);
        }
    }
    function fileDoesNotExist(){
        alert("File not exists!");
        res = false;
        try {
        callback(res);
        }
        catch(e){
            alert(e.message);
        }
    }
    function onDeviceReady(){
        checkIfFileExists(pathToFile);
    }
}