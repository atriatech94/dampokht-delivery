
document.addEventListener('deviceready',onDeviceReady, false);
function onDeviceReady() {   
 ons.ready(function () {
   ons.disableDeviceBackButtonHandler();
   document.addEventListener("backbutton",amintest, false);  
});   

function amintest(){
   
    var loc =   window.location.hash;
    loc = loc.replace("#/", "");
    var loc1 = loc.split('/');
    if(loc == 'home' || loc=="login"){
        var r = confirm("آیا برای خروج اطمینان دارید ؟");
        if (r == true) {
            navigator.app.exitApp();
        }
    }
    else{
       window.history.back(); 
    }
   }
}


