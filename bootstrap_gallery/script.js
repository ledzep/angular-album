var todos = angular.module('todos', ['ngAnimate', 'ui.bootstrap', 'ngSlider']);

todos.controller('TodoController', function($scope, $http) {
   $scope.filteredPhotos = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 3
  ,$scope.maxSize = 5
  ,$scope.photos = []
  ,$scope.login = {}
  ,$scope.locationData = {}
  ,$scope.GoogleIdObject = {}
  ,$scope.latlng = [] 
  ,$scope.getImageList = {};

    var responsePromise = $http.get("http://localhost/kapsureweb/services/?param=login&login_source=fb&first_name=Anshul&last_name=Gupta&fbid=100008213550306&email=6iosdeveloper@gmail.com&apnstoken=123");

    responsePromise.success(function(data, status, headers, config) {
        $scope.login = data.responseData;
        $scope.token = $scope.login.session_token;
        //alert("Login Successful");

        var temp = {headers: {'token': $scope.login.session_token}};

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var coords = position.coords;

                var responsePromise = $http.get("http://localhost/kapsureweb/services/?param=getGoogleLocationListByLatLong&lat="+coords.latitude+"&long="+coords.longitude+"", temp);

                responsePromise.success(function(data, status, headers, config){
                    $scope.locationData = data.responseData.results;
                    console.log($scope.locationData.length);
                    for (var i = 0; i < $scope.locationData.length; i++) {
                        var object = $scope.locationData[i];
                        for (var property in object) 
                        {
                            if(property == "geometry") 
                            {
                               var tempGeometry =  object[property];
                               for(var j in tempGeometry) {
                                if(j == "location") {
                                    var tempLocation =  tempGeometry[j];
                                    tempLocation.name = object.name;
                                    tempLocation.id = object.id;
                                    console.log(tempLocation);
                                    $scope.latlng.push(tempLocation);
                                    for(var k in tempLocation) {
                                        console.log('item ' + k + ': ' + k + '=' + tempLocation[k]);
                                    }
                                }
                                //console.log('item ' + j + ': ' + j + '=' + tempGeometry[j]);
                                }
                            }  
                            console.log('item ' + i + ': ' + property + '=' + object[property]);
                        }
                        // If property names are known beforehand, you can also just do e.g.
                        // alert(object.id + ',' + object.Title);
                    }

                    for (var i = 0; i < $scope.latlng.length; i++){
                        console.log("calling createMarker function")
                        console.log($scope.latlng[i]);
                        createMarker($scope.latlng[i]);
                    }
                });

                var mapOptions = {
                    zoom: 13,
                    center: new google.maps.LatLng(coords.latitude, coords.longitude),
                    mapTypeId: google.maps.MapTypeId.TERRAIN    
                }

                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                $scope.markers = [];

                var infoWindow = new google.maps.InfoWindow();
                
                var createMarker = function (info) {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.lng),
                        title: info.name
                    });
                    marker.content = '<div class="infoWindowContent">' + info.lat + ',' + info.lng + '</div>';

                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });
        
                    console.log(info);
                    console.log("Adding markers to the LatLng");
                    console.log(marker);
                    $scope.markers.push(marker);
                }
            });
        }
    });

    responsePromise.error(function(data, status, headers, config) {
        alert("AJAX failed!");
    });

    $scope.getImageList.doClick = function(item, event) {
        //alert("Token=" + $scope.login.session_token);

        var foo = {headers: {'token': $scope.login.session_token}};

        var responsePromise = $http.get("http://localhost/kapsureweb/services/?param=getImageList&google_id="+$scope.GoogleIdObject.id+"&startDate="+$scope.dateString+"&startTime=00:00&endTime=23:59", foo);

        responsePromise.success(function(data, status, headers, config) {
            $scope.photos = data.responseData;
            console.log($scope.photos);
            $scope.total = $scope.photos.length;
            // initial image index
            $scope._Index = 0;

            // if a current image is the same as requested image
            $scope.isActive = function (index) {
                return $scope._Index === index;
            };

            // show prev image
            $scope.showPrev = function () {
                $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.filteredPhotos.length - 1;
            };

            // show next image
            $scope.showNext = function () {
                $scope._Index = ($scope._Index < $scope.filteredPhotos.length - 1) ? ++$scope._Index : 0;
            };

            // show a certain image
            $scope.showPhoto = function (index) {
                $scope._Index = index;
            };

            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                
                $scope.filteredPhotos = $scope.photos.slice(begin, end);
                console.log($scope.filteredPhotos);
            });
        });
    }

    $scope.dt = new Date();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.value = "10;15";
    $scope.options = {       
        from: 480,
        to: 1020,
        step: 15,
        dimension: '',
        scale: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        limits: false,
        calculate: function( value ){
            var hours = Math.floor( value / 60 );
            var mins = ( value - hours*60 );
            return (hours < 10 ? "0"+hours : hours) + ":" + ( mins == 0 ? "00" : mins );
        },
        onstatechange: function( value ){
            console.log( this );
        }
    };

    $scope.$watch('value', function() {
        console.log($scope.value);
    });

    $scope.$watch('dt', function() {
        console.log($scope.dt);
        var month = $scope.dt.getMonth()+1;
        var day = $scope.dt.getDate();
        var year = $scope.dt.getFullYear();
        $scope.dateString = day + '-' + month + '-' + year
        //$scope.dateString = $scope.dt.getDate() + "-" + ($scope.dt.getMonth() + 1) + "-" + $scope.dt.getFullYear();
        console.log($scope.dateString);
    });
});

