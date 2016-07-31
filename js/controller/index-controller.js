angular.module('my-peik')
.controller('HomeController', function($scope,$http,$location,$route,$timeout) {
     
     
      $timeout(function(){
              if(localStorage.getItem('reg_id') && !localStorage.getItem('has_reg_id')){
                       $http({
                          method: 'POST',
                          url: base_url+'reg_id_deliver/HDaMin2dsaZ3QZYTRRE782',
                          data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       }).then(function successCallback(response) {
                             localStorage.setItem('has_reg_id',1);  
                       });    
                 }
                 else if(!localStorage.getItem('has_reg_id')){
                    $timeout(function(){
                          if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
                            $http({
                                method: 'POST',
                                url: base_url+'reg_id_deliver/HDaMin2dsaZ3QZYTRRE782',
                                data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                             }).then(function successCallback(response) {
                                localStorage.setItem('has_reg_id',1);  
                             });     
                          }
                          else{
                             $timeout(function(){  
                                     if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
                                     $http({
                                        method: 'POST',
                                        url: base_url+'reg_id_deliver/HDaMin2dsaZ3QZYTRRE782',
                                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                      }).then(function successCallback(response) {
                                        localStorage.setItem('has_reg_id',1);  
                                     });  
                                   }
                                       
                             },6500); 
                              
                          }
                        
                     },2000); 
                 }
          },1500);
     
      $scope.go = function ( path ) {$location.path( path );};
         $scope.offset = 0;
        
         $scope.refresh = function(){
             $route.reload();
         }; 

       $scope.loaded = false;
       document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'deliver_waited_order/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.messages = response.data;
                            if($scope.messages.length < 15)
                               $scope.loaded = false;
                            else   
                              $scope.loaded = true;
                            $scope.offset = $scope.offset + $scope.messages.length;
                         }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });

     $scope.load_more = function(){
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'deliver_waited_order/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.messages = $scope.messages.concat(response.data);
                            $scope.loaded = true;
                            $scope.offset = $scope.offset + $scope.messages.length;
                            if(response.data.length < 15)
                               $scope.loaded = false;
                            else   
                              $scope.loaded = true;

                         }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });
       
     };      
   
});
