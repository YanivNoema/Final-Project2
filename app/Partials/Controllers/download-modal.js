/**
 * Created by shay on 24/04/17.
 */

app.controller('DownloadController', ['$scope', '$uibModalInstance', 'downloadList',
    function ($scope, $uibModalInstance, downloadList){
    var $ctrl = this;
    $ctrl.downloadList = downloadList;
    $ctrl.counter = $ctrl.downloadList.length;

    $ctrl.updateCounter = function(index) {
        if($ctrl.downloadList[index].downloadStatus)
            $ctrl.counter++;
        else
            $ctrl.counter--;
    }

    $ctrl.ok = function () {

        // $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        //Added just to push new file
        $uibModalInstance.dismiss('cancel');
    };
}]);


//USE THE NEXT CODE FOR COMPRESSING TO ZIP
// var zip = new JSZip();
// var count = 0;
// var zipFilename = "zipFilename.zip";
// var urls = [
//     'http://tinypic.com/r/9kcy7a/5',
//     'http://tinypic.com/r/ieqsfa/5',
//     'http://tinypic.com/r/xddzyo/5'
// ];
//
// urls.forEach(function(url){
//     var filename = "filename";
//     // loading a file and add it in a zip file
//     JSZipUtils.getBinaryContent(url, function (err, data) {
//         if(err) {
//             throw err; // or handle the error
//         }
//         zip.file(filename, data, {binary:true});
//         count++;
//         if (count == urls.length) {
//             zip.generateAsync({type:'blob'}).then(function(content) {
//                 saveAs(content, zipFilename);
//             });
//         }
//     });
// });