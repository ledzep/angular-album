var todos = angular.module('todos', ['ui.bootstrap', 'ngSlider']);

todos.controller('TodoController', function($scope) {
   $scope.filteredPhotos = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 3
  ,$scope.maxSize = 5
  ,$scope.photos = [
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-10092788820140611161034.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-10092788820140611161034.jpeg",
            "post_date": "2014-06-11 16:10:49"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-34023445720140611161034.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-34023445720140611161034.jpeg",
            "post_date": "2014-06-11 16:10:45"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-158645989720140611161034.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-158645989720140611161034.jpeg",
            "post_date": "2014-06-11 16:10:42"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-212652988520140611152250.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-212652988520140611152250.jpeg",
            "post_date": "2014-06-11 15:23:02"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-104551320420140611152247.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-104551320420140611152247.jpeg",
            "post_date": "2014-06-11 15:22:59"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-146211011120140611152244.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-146211011120140611152244.jpeg",
            "post_date": "2014-06-11 15:22:51"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-19895996220140611152241.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-19895996220140611152241.jpeg",
            "post_date": "2014-06-11 15:22:50"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-171157405820140611152241.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-171157405820140611152241.jpeg",
            "post_date": "2014-06-11 15:22:48"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-121505337420140611152240.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-121505337420140611152240.jpeg",
            "post_date": "2014-06-11 15:22:47"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-114203573120140611152240.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-114203573120140611152240.jpeg",
            "post_date": "2014-06-11 15:22:47"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-167456596620140611152236.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-167456596620140611152236.jpeg",
            "post_date": "2014-06-11 15:22:44"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-37109885620140611152233.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-37109885620140611152233.jpeg",
            "post_date": "2014-06-11 15:22:41"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-30048105820140611152226.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-30048105820140611152226.jpeg",
            "post_date": "2014-06-11 15:22:41"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-172492968920140611152226.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-172492968920140611152226.jpeg",
            "post_date": "2014-06-11 15:22:40"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-46763295820140611152233.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-46763295820140611152233.jpeg",
            "post_date": "2014-06-11 15:22:40"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-198717977020140611152226.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-198717977020140611152226.jpeg",
            "post_date": "2014-06-11 15:22:36"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-28382962420140611152226.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-28382962420140611152226.jpeg",
            "post_date": "2014-06-11 15:22:33"
        },
        {
            "thumbImage": "http://kapsure-assets.s3.amazonaws.com/thumb-178576214320140611152226.jpeg",
            "largeImage": "http://kapsure-assets.s3.amazonaws.com/container-178576214320140611152226.jpeg",
            "post_date": "2014-06-11 15:22:33"
        }
    ]
    ,$scope.total = $scope.photos.length;
    
    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

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


  
  /*$scope.makeTodos = function() {
    $scope.todos = [];
    for (i=1;i<=1000;i++) {
      $scope.todos.push({ text:'todo '+i, done:false});
    }
  };
  $scope.makeTodos();*/ 
  
  /*$scope.numPages = function () {
    return Math.ceil($scope.total / $scope.numPerPage);
  };*/
  
  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.filteredPhotos = $scope.photos.slice(begin, end);
    console.log($scope.filteredPhotos);
  });

  $scope.$watch('dt', function() {
    console.log($scope.dt);
    $scope.dateString = $scope.dt.getDate() + "-" + $scope.dt.getMonth() + "-" + $scope.dt.getFullYear();
    console.log($scope.dateString);
  });
});

