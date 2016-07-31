angular.module('my-peik')
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'page/members/login.html',
            controller: 'LoginController',
        })
        .when('/home', {
            templateUrl: 'page/home/index.html',
            controller: 'HomeController',
        })
        .when('/login', {
            templateUrl: 'page/members/login.html',
            controller: 'LoginController',
        })
        .when('/order', {
            templateUrl: 'page/order/index.html',
            controller: 'OrderController',
		})
        .when('/order_detail/:id', {
            templateUrl: 'page/order/order_detail.html',
            controller: 'OrderdetailController',
		})      
});
