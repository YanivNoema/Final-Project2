/*
 * Created by shay on 01/04/17.
 */

app.controller('tableController', ['$scope', '$uibModal','mapFilterService', function ($scope, $uibModal, $log, $http, mapFilterService) {
    $scope.minScaleFilter = '';
    $scope.maxScaleFilter = '';
    $scope.minYearFilter = '';
    $scope.maxYearFilter = '';
    $scope.filterMessage = "Data will be shown after you'll click the search button";

    $scope.gridOptions = {};
    $scope.testData = [{"BibSysNo":"000133327", "scale":"1:2500", "year":"1935", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000133327&indx=1&recIds=972THI_ALEPH000133327&recIdxs=0&elementId=0&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000131944", "scale":"1:12500", "year":"1991", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000131944&indx=3&recIds=972THI_ALEPH000131944&recIdxs=2&elementId=2&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000127162", "scale":"1:100000", "year":"1986", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000127162&indx=4&recIds=972THI_ALEPH000127162&recIdxs=3&elementId=3&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000122808", "scale":"1:50000", "year":"1970", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000122808&indx=6&recIds=972THI_ALEPH000122808&recIdxs=5&elementId=5&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&vl(221095693UI0)=any&dstmp=1491050789864"},
        {"BibSysNo":"000131631", "scale":"1:15000", "year":"1948", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000131631&indx=4&recIds=972THI_ALEPH000131631&recIdxs=3&elementId=3&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D&vl(221095693UI0)=any&dstmp=1493013835597"},
        {"BibSysNo":"000127460", "scale":"1:100000", "year":"1962", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000127460&indx=2&recIds=972THI_ALEPH000127460&recIdxs=1&elementId=1&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%91%D7%90%D7%A8%20%D7%A9%D7%91%D7%A2&vl(221095693UI0)=any&dstmp=1493013821109"},
        {"BibSysNo":"000131965", "scale":"1:5000", "year":"1957", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000131965&indx=1&recIds=972THI_ALEPH000131965&recIdxs=0&elementId=0&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%91%D7%90%D7%A8%20%D7%A9%D7%91%D7%A2&vl(221095693UI0)=any&dstmp=1493013821109"},
        {"BibSysNo":"000134246", "scale":"1:50000", "year":"1980", "url":"http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/display.do?tabs=detailsTab&gathStatTab=true&ct=display&fn=search&doc=972THI_ALEPH000134246&indx=1&recIds=972THI_ALEPH000134246&recIdxs=0&elementId=0&renderMode=poppedOut&displayMode=full&frbrVersion=&frbg=&&vl(1UI0)=contains&dscnt=0&scp.scps=scope%3A%28%22972THI%22%29%2Cprimo_central_multiple_fe&tb=t&vid=972THI_V1&mode=Basic&srt=rank&tab=combined_search&vl(232124172UI1)=maps&dum=true&vl(freeText0)=%D7%A8%D7%9E%D7%AA%20%D7%94%D7%92%D7%95%D7%9C%D7%9F&vl(221095693UI0)=any&dstmp=1493014083639"}];

    $scope.init = function() {
        //TODO:ADD Initializing data to load data from server
    }
    
    $scope.gridOptions = {
        rowTemplate:'Partials/Controllers/row-template.html',
        enableSorting: true,
        enableFiltering: true,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableHiding: false,
        enableColumnMenus: false,
        columnDefs : [
            {field: "BibSysNo", displayName: "BibSysNo"},
            {field: "scale", displayName: "Scale"},
            {field: "year", displayName: "Year"},
            {field: "url", enableFiltering: false, displayName: "Link", cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{COL_FIELD}}" target="_blank">Link</a></div>'}
        ]};

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };

    $scope.selectAll = function() {
        $scope.gridApi.selection.selectAllRows();
    };

    $scope.clearAll = function() {
        $scope.gridApi.selection.clearSelectedRows();
    };

    $scope.DownloadMaps = function(data) {
        //TODO: Create modal that shows the list of selected rows
        $scope.selectedItems = $scope.gridApi.selection.getSelectedRows();
        if($scope.selectedItems.length === 0)
            return;
        $scope.selectedItems.forEach(function (item) {
            item.downloadStatus = true;
        } );
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'Partials/Controllers/download-modal-view.html',
            controller: 'DownloadController',
            controllerAs: '$ctrl',
            resolve: {
                downloadList: function () {
                    return $scope.selectedItems;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            //TODO: Send http get request with all selected rows to download the maps
        }, function () {
            //TODO: Add
        });
    }

    $scope.searchMaps = function () {
        //TODO: When function is called need to get coordinates from map and filter data accordingly
        //NEXT LINE is FOR TEST ONLY
        $scope.gridOptions.data = mapFilterService.search();

        $scope.filterMessage = 'Use the filters to reduce the amount of results';
    }

    $scope.init();
}]);