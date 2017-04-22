/*
 * Created by shay on 01/04/17.
 */

app.controller('tableController', ['$scope', function ($scope) {
    $scope.gridOptions = {};
    $scope.testData = [{"BibSysNo":"000133327", "scale":"1:2500", "year":"1935", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000133327&indx=1&recIds=972THI_ALEPH000133327&recIdxs=0&elementId=0&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000131944", "scale":"1:12,500", "year":"1991", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000131944&indx=3&recIds=972THI_ALEPH000131944&recIdxs=2&elementId=2&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000127162", "scale":"1:100,000", "year":"1986", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000127162&indx=4&recIds=972THI_ALEPH000127162&recIdxs=3&elementId=3&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000122808", "scale":"1:50,000", "year":"1970", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000122808&indx=6&recIds=972THI_ALEPH000122808&recIdxs=5&elementId=5&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"}];

    $scope.init = function() {
        $scope.gridOptions.data = $scope.testData;

    }

    $scope.gridOptions = {
        rowTemplate:'Partials/Controllers/row-template.html',
        enableSorting: true,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableHiding: false,
        enableColumnMenus: false,
        columnDefs : [
            {field: "BibSysNo", displayName: "BibSysNo"},
            {field: "scale", displayName: "Scale"},
            {field: "year", displayName: "Year"},
            {field: "url", displayName: "Link", cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{COL_FIELD}}" target="_blank">Link</a></div>'}
        ]};

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };

    $scope.init();
}]);