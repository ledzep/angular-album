if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var coords = position.coords;

    var responsePromise = $http.get("http://localhost/kapsureweb/services/?param=getGoogleLocationListByLatLong&lat="+coords.latitude+"&long="+coords.longitude+"", config);

    responsePromise.success(function(data, status, headers, config){
        $scope.locationData = data.responseData.results;
        console.log($scope.locationData);
    });

    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);

    var myOptions = {
        zoom: 18,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var infowindow = new google.maps.InfoWindow({
        content: 'Hey, I am here!'
    });

    infowindow.open($scope.map, marker);
    )};
}


//LatLng from getGoogleLocationListByLatLong

for (var i = 0; i < arrayOfObjects.length; i++) {
    var object = arrayOfObjects[i];
    for (var property in object) 
    {
        if(property == "geometry") 
        {
           var tempGeometry =  object[property];
           for(var j in tempGeometry) {
            if(j == "location") {
                var tempLocation =  tempGeometry[j];
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


//location object to push into an array
for (var i = 0; i < arrayOfObjects.length; i++) {
    var object = arrayOfObjects[i];
    for (var property in object) 
    {
        if(property == "geometry") 
        {
           var tempGeometry =  object[property];
           for(var j in tempGeometry) {
            if(j == "location") {
                var tempLocation =  tempGeometry[j];
                console.log(tempLocation);
                latlng.push(tempLocation);
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


http://localhost/kapsureweb/services/?param=getGoogleLocationListByLatLong&lat=22.716703&long=75.861497

34759480416

