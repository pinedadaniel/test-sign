angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.controller('IntroCtrl', function($document, $scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
 
  $scope.$evalAsync(function () {
  //Signature
  var $signature = document.getElementById("signature"),
      $signatureContext = $signature.getContext("2d"),
      lastMousePoint = {x:0, y:0};
  $signatureContext.strokeStyle = "#000000";
  $signatureContext.lineWidth = 1;
    
  function updateMousePosition(event) {
    var target = (event.originalEvent && event.originalEvent.touches) ? event.originalEvent.touches[0] : event;
    var offset = $signature.getBoundingClientRect();
    var offsetTop = offset.top + (window.pageYOffset || $signature.scrollTop )  - ( $signature.clientTop  || 0 );
    var offsetLeft = offset.left + (window.pageXOffset || $signature.scrollLeft )  - ( $signature.clientLeft  || 0 );
    lastMousePoint.x = target.pageX - offsetLeft;
    lastMousePoint.y = target.pageY - offsetTop;
}
  function onCanvasMouseMove(event){
    $signatureContext.beginPath();
    $signatureContext.moveTo(lastMousePoint.x, lastMousePoint.y);
    updateMousePosition(event);
    $signatureContext.lineTo(lastMousePoint.x, lastMousePoint.y);
    $signatureContext.stroke();
  }
  function onCanvasMouseUp(event){
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSideMenuDelegate.canDragContent(true);
    $signature.removeEventListener("touchmove", onCanvasMouseMove, false);
    $signature.removeEventListener("mousemove", onCanvasMouseMove, false);
    $signature.removeEventListener("touchend", onCanvasMouseUp, false);
    $signature.removeEventListener("mouseup", onCanvasMouseUp, false);
  }
  function onCanvasMouseDown(event){
    $ionicSlideBoxDelegate.enableSlide(false);
    $ionicSideMenuDelegate.canDragContent(false);
    $signature.addEventListener("touchmove", onCanvasMouseMove, false);
    $signature.addEventListener("mousemove", onCanvasMouseMove, false);
    $signature.addEventListener("touchend", onCanvasMouseUp, false);
    $signature.addEventListener("mouseup", onCanvasMouseUp, false);
    updateMousePosition(event);
    onCanvasMouseMove(event);
  }
  $signature.addEventListener("touchstart", onCanvasMouseDown, false);
  $signature.addEventListener("mousedown", onCanvasMouseDown, false);
  
  $scope.ClearCanvas = function(){
    $signatureContext.clearRect(0, 0, $signature.width, $signature.height);
  };
  $scope.imageData = "";
  $scope.GetData = function(){
    var dataString = $signature.toDataURL("image/png");
    //var index = dataString.indexOf(",") + 1;
    //dataString = dataString.substring(index);
    $scope.imageData = dataString;
  };
  //End Signature
  });
  
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }
});