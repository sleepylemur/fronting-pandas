angular.module('newPost',[])
  .controller('newPostCtrl', function($http, $location, $rootScope, $scope, $window){
      $scope.post = {};
      $scope.submit = function(){
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.post.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          $http.post('/api/newPost', $scope.post).success(function(data, status, header, config){
            //tell socket new post has been made
            $rootScope.socket.emit('new post', data);
            $location.path('/post').search({id: data.id});
          }).error(function(data, status, header, config){
            console.log("post failed!!!"  + data);
          });
      });
    }
  });
