var app = angular.module("AngularAlbum",[]); 

app.controller('MapCtrl', function($scope, $http) {
	
	$scope.photos = [{thumbnail:'http://kapsure-assets.s3.amazonaws.com/thumb-48775980220140611094520.jpeg', image:'http://kapsure-assets.s3.amazonaws.com/container-48775980220140611094520.jpeg'}, {thumbnail:'http://kapsure-assets.s3.amazonaws.com/thumb-181692225420140611094518.jpeg', image:'http://kapsure-assets.s3.amazonaws.com/container-181692225420140611094518.jpeg'}, {thumbnail:'http://kapsure-assets.s3.amazonaws.com/thumb-38436679320140611094519.jpeg', image:'http://kapsure-assets.s3.amazonaws.com/container-38436679320140611094519.jpeg'}, {thumbnail:'http://kapsure-assets.s3.amazonaws.com/thumb-164360377920140611094519.jpeg', image:'http://kapsure-assets.s3.amazonaws.com/container-164360377920140611094519.jpeg'}, {thumbnail:'http://kapsure-assets.s3.amazonaws.com/thumb-54612878220140611094518.jpeg', image:'http://kapsure-assets.s3.amazonaws.com/container-54612878220140611094518.jpeg'}];
	
	//alert("hello"+ $scope.photos);
	
	// initial image index
	$scope._Index = 0;
	
	// if a current image is the same as requested image
    $scope.isActive = function (index) {
		return $scope._Index === index;
	};
	
	// show a certain image
    $scope.showPhoto = function (index) {
		$scope._Index = index;
	};
	
	
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
    $scope.map.fitBounds(defaultBounds);
    
    $scope.input = /** @type {HTMLInputElement} */
    (document.getElementById('target'));
    var searchBox = new google.maps.places.SearchBox($scope.input);
    
    $scope.markers = [];
    
    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        $scope.places = searchBox.getPlaces();
        /*for (var i = 0, marker; marker = $scope.markers[i]; i++) {
            marker.setMap(null);
        }*/
        
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = $scope.places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          $scope.markers.push(marker);

          bounds.extend(place.geometry.location);
        }
        $scope.map.fitBounds(bounds);
        
    });

});