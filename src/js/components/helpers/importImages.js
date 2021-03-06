export default function createDirectory(fullPath, callback) {
    var filePath = fullPath;
    var fileArr= filePath.split('/');
    var fileName = fileArr[fileArr.length-1];
    /*function createDirectoryMain() {
        let path = cordova.file.externalRootDirectory;
        try {
                window.resolveLocalFileSystemURL(path, function(dir) {
                dir.getDirectory("StreetFoodBar", {create:true}, function(subDir) {
                    subDir.getDirectory("images", {create:true}, function(secSubDir) {
                        getImgFile(secSubDir);
                    });
                });
            });
        }
        catch (e) {
            alert(e.message);
        }
    }*/

    function createDirectoryMain() {
        let path = cordova.file.externalRootDirectory;
        path = path + 'StreetFoodBar/images/' + fileName;
        window.resolveLocalFileSystemURL(path, fileExist, fileNotExist);
    }

    function fileExist(){

        if (callback && typeof(callback) === "function") {
            callback(fileName, true);
        }
    }

    function fileNotExist(){
        let path = cordova.file.externalRootDirectory;
        //alert(fileName + ' is NOT exist!');
        try {
            window.resolveLocalFileSystemURL(path, function(dir) {
                dir.getDirectory("StreetFoodBar", {create:true}, function(subDir) {
                    subDir.getDirectory("images", {create:true}, function(secSubDir) {
                        getImgFile(secSubDir);
                    });
                });
            });
        }
        catch (e) {
            alert(e.message);
        }
    }

    function getImgFile(dirEntry) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', filePath, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                if (this.status == 200) {
                    let blob = new Blob([this.response], {type: 'image/jpg'});
                    saveFile(dirEntry, blob, fileName);

                }
            };
            xhr.send();
        }
        catch(err){
            alert(err.message);
        }
    }

    function saveFile(dirEntry, fileData, fileName) {

        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
            writeFile(fileEntry, fileData);
            if (callback && typeof(callback) === "function") {
                callback(fileName, true);
            }
        }, function(err){
                alert(err.message);
        });
    }

    function writeFile(fileEntry, dataObj, isAppend) {
        try {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.write(dataObj);

            });
        }
        catch(err){
            alert(err.message);
        }
    }
    document.addEventListener('deviceready', createDirectoryMain, false);
}
