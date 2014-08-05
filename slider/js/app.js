var app = angular.module('website', ['ngAnimate', 'ngTouch'])

    app.controller('MainCtrl', function ($scope,$http) {
        $scope.date = '19-05-2014';
        $scope.login = {};
        $scope.locationData = {};
        $scope.start_time = "";
        $scope.end_time = "";
        $scope.latlng = [];
        $scope.slides = [];
        $scope.GoogleIdObject = {};
        $scope.getImageList = {};
        $scope.direction = 'left';
        $scope.currentIndex = 0;

        var responsePromise = $http.get("http://192.168.0.115/kapsureweb/services/?param=login&login_source=fb&first_name=Anshul&last_name=Gupta&fbid=100008213550306&email=6iosdeveloper@gmail.com&apnstoken=123");

        responsePromise.success(function(data, status, headers, config) {
            $scope.login = data.responseData;
            $scope.token = $scope.login.session_token;
            alert("Login Successful");

            var temp = {headers: {'token': $scope.login.session_token}};

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var coords = position.coords;

                    var responsePromise = $http.get("http://192.168.0.115/kapsureweb/services/?param=getGoogleLocationListByLatLong&lat="+coords.latitude+"&long="+coords.longitude+"", temp);

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
            alert("Token=" + $scope.login.session_token);

            var foo = {headers: {'token': $scope.login.session_token}};

            var responsePromise = $http.get("http://192.168.0.115/kapsureweb/services/?param=getImageList&google_id="+$scope.GoogleIdObject.id+"&startDate="+$scope.date+"&startTime="+$scope.start_time+"&endTime="+$scope.end_time+"", foo);

            responsePromise.success(function(data, status, headers, config) {
                $scope.slides = data.responseData;
                console.log($scope.slides);
                $scope.setCurrentSlideIndex = function (index) {
                    $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                    $scope.currentIndex = index;
                };

                $scope.isCurrentSlideIndex = function (index) {
                    return $scope.currentIndex === index;
                };

                $scope.prevSlide = function () {
                    $scope.direction = 'left';
                    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
                };

                $scope.nextSlide = function () {
                    $scope.direction = 'right';
                    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
                };
            });
        }
    });

    app.directive('datepicker', function() {
        return {
            restrict: 'A',
            require : 'ngModel',
            link : function (scope, element, attrs, ngModelCtrl) {
                $(function(){
                    element.datepicker({
                        dateFormat:'dd-mm-yy',
                        onSelect:function (date) {
                            ngModelCtrl.$setViewValue(date);
                            scope.$apply();
                        }
                    });
                });
            }
        }
    });

    app.directive('stimepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link : function(scope, element, attrs, ngModelCtrl) {
                $(function(){
                    element.datetimepicker({
                        datepicker:false,
                        format:'H:i',
                        onSelect:function (start_time) {
                            ngModelCtrl.$setViewValue(start_time);
                            scope.$apply();
                        }
                    });
                });
            }
        }
    });

    app.directive('etimepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link : function(scope, element, attrs, ngModelCtrl) {
                $(function(){
                    element.datetimepicker({
                        datepicker:false,
                        format:'H:i',
                        onSelect:function (end_time) {
                            ngModelCtrl.$setViewValue(end_time);
                            scope.$apply();
                        }
                    });
                });
            }
        }
    });

    app.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });

