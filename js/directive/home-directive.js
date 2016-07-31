angular.module('my-peik')
.directive('swiperDir' , function ($timeout){
    return {
        link: function() {
            $timeout(function(){
               
             });   
        }
}})
.directive('dirLink', function($location,$http) {
  return {
      link: function(scope, element, attrs) {
         if(localStorage.getItem('user_id')){
             scope.login = true;
         }
         else{
             scope.login = false; 
         }

         scope.p_name = localStorage.getItem('name')+" "+localStorage.getItem('lastname');
         scope.exit = function(){
              navigator.app.exitApp();
         };
         scope.logOut = function(){
              $http({
                        method: 'POST',
                        url: base_url+'unreg_id_deliver/HDaMin2dsaZ3QZYTRRE782',
                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id')}),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   });
            localStorage.clear();
            $location.path('/login');
         };
        
      },
      templateUrl : 'page/hamber_menu/index.html'
    };
})

.service('loadGoogleMapAPI', ['$window', '$q', function ( $window, $q ) {

        var deferred = $q.defer(); 

        // Load Google map API script
        function loadScript() {  
            // Use global document since Angular's $document is weak
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDJG0muXYgLjq-1RfNgWzDvi_-WU9c_7QI&sensor=false&language=fa&callback=initMap';
            document.body.appendChild(script);
        }

        // Script loaded callback, send resolve
        $window.initMap = function () {
            deferred.resolve();
        }

        loadScript();

        return deferred.promise;
}])
.directive('googleMap',  function( $rootScope, loadGoogleMapAPI , $http , $location ) {  

        return {
            restrict: 'C', // restrict by class name
            scope: {
                mapId: '@id', // map ID
                lat: '@',     // latitude
                long: '@'     // longitude
            },
            link: function( scope, elem, attrs ) {
                 
                
                var flightPath , flightPathh , area_id , center_mp , map , last_points , directionsDisplay;
                var markers = [];
                var other , first_loc = null ;
                var b = 0;
                var counter = 0 ; 
                var geocoder,geocoder2;
                
                var is_click = 1 ; 
                
                
                var _latitude = scope.lat;
                var _longitude = scope.long;
                var gpss ;
                /*get geo */
               
                if ( angular.isDefined(scope.lat) && angular.isDefined(scope.long) ) 
                {
                    scope.initialize = function() {   
                        var mapCenter = new google.maps.LatLng(_latitude,_longitude);
                        var mapOptions = {
                            zoom: 16,
                            center: mapCenter,
                            disableDefaultUI: false,
                                //scrollwheel: false,

                            };
                            var mapElement = document.getElementById('submit-map');
                            var map = new google.maps.Map(mapElement, mapOptions);
                            var marker = new google.maps.Marker({
                                position: mapCenter,
                                map: map,
                                icon: 'img/marker.png',
                                labelAnchor: new google.maps.Point(50, 0),
                                draggable: true
                            });
                        }
                    loadGoogleMapAPI.then(function(){scope.initialize();},function(){});
                }
                
                
                           
                   
        }
    };
})
