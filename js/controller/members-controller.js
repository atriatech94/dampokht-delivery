angular.module('my-peik')
.controller('MembersController', function($scope) {

})
.controller('LoginController', function($scope,$location,$http) {
   if(localStorage.getItem('user_id'))
    {
        $location.path("/home");
    }  
   
    $scope.submit = function () {
         $scope.user = document.getElementById('username').value;
         $scope.password = document.getElementById('password').value;
        if($scope.user == '' ||  $scope.password == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: 'نام کاربری و رمز عبور را وارد کنید !!'
            });
                    
        }
        else
        {
                       
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'POST',
                url: base_url+'login_delivery/HDaMin2dsaZ3QZYTRRE782BGFFzxe',
                data: $.param({user: $scope.user,password : $scope.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                if(response.data == 0)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'نام کاربری یا رمز عبور اشتباه است !!'
                    });
                    return false;  
                }
                else
                {
                    $scope.user_info = response.data;
                    localStorage.setItem('user_id',$scope.user_info.deliver_id);
                    localStorage.setItem('name',$scope.user_info.name);
                    localStorage.setItem('lastname',$scope.user_info.lastname);
                    localStorage.setItem('branch_name',$scope.user_info.branch_name);
                   
                  if(localStorage.getItem('reg_id')){
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
                       app1.initialize();  
                    }
                 $location.path("/home");
                    
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
        }
                
             
    };
});
