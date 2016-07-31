angular.module('my-peik')
.controller('OrderController', function($scope,$http,$location,$route) {
      $scope.go = function ( path ) {$location.path( path );};
         $scope.offset = 0;
        
         $scope.refresh = function(){
             $route.reload();
         }; 

       $scope.loaded = false;
       document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'deliver_old_order/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
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
                url: base_url+'deliver_old_order/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
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
})
.controller('OrderdetailController', function($scope,$location,$http,$routeParams) {

      $scope.go = function ( path ) {
         $location.path( path );
      };
      
     document.getElementById('loading').removeAttribute('style');    
     $http({
                method: 'GET',
                url: base_url+'order_detail_deliver/HamiDaMin23QZYTRRE782/'+$routeParams.id+'/'+localStorage.getItem('user_id'),
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                               $scope.order = response.data.order;
                               $scope.order_detail = response.data.order_detail;
                               $scope.address = response.data.address;
                                  
                            }   
                            else
                            {
                                 ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                
                            }
                           
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        return false;
                 }); 
    $scope.accept = function ( order_id ) {
         
            ons.notification.confirm({
                    title : "پیام",
                    message: 'برای تایید سفارش اطمینان دارید ؟',
                    buttonLabels : ['خیر','بلی'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                       
                                    break;
                                case 1:
                                   $scope.do_acc(order_id);
                                   break;
                        }
                    }
           });
         
          }; 
          
        $scope.do_acc= function ( order_id ){
         document.getElementById('loading').removeAttribute('style');       
           $http({
                method: 'POST',
                url: base_url+'accept_order/HamiDaMin23QZYTRRE782',
                data: $.param({ 
                    order_id :  order_id,
                    user_id : localStorage.getItem('user_id')
                 }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data == 1)
                            {
                               $location.path('/home'); 
                            }
                            else
                            {
                                 ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                
                            }
                           
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        return false;
                 });  
    };  


     $scope.showDialog = function(id) {
        document.getElementById(id).show();
    };

    $scope.hideDialog = function(id) {
        document.getElementById(id).hide();
    };
   
    
    $scope.send_answer = function(id) {
        $scope.text = document.getElementById('text_a').value; 
         $scope.order_id_d = $routeParams.id;
          if($scope.text == ""){
               ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'لطفا دلیل رد سفارش را بنویسید !!'
                                });
               return false;                 
          }
          
          document.getElementById(id).hide();
          document.getElementById('loading').removeAttribute('style');   
          $http({
                method: 'POST',
                url: base_url+'deny/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id : localStorage.getItem('user_id'),
                   order_id : $scope.order_id_d,
                   text :  $scope.text
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                       
                        $location.path('/home' );
                                 
                                  
                          }, function errorCallback(response) {
                              document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        return false;
                 });
          
      
    };  


});

