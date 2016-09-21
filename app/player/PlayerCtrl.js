crate.controller('PlayerCtrl', function($scope, $rootScope, stereo){
  $scope.getActiveTrack  = function() { return stereo.activeTrack; };
  $scope.getProgress     = function() { return stereo.getProgress(); };
  $scope.progress = 0;
  $scope.playToggle = function() {
		var state = stereo.playToggle();
	};
  $scope.getIsPlaying    = function() { return stereo.isPlaying; };

  $scope.back = function() {
		// should call a stereo method
		player.seekTo(stereo.activeTrack.begin);
	};

  $scope.backBack = function() {
		//these are both awful and need to be re written
		stereo.setTrack(stereo.activeTracks[stereo.activeTracks.indexOf(stereo.activeTrack) - 1]);
	};

  $scope.next = function() {
		// wow thats ugly
		stereo.setTrack(stereo.activeTracks[stereo.activeTracks.indexOf(stereo.activeTrack) + 1]);
	};

  $scope.seekTo = function(time) {
		stereo.seekTo(time);
	};

  // This might break if playing a playlist or an album assembled from multiple youtube videos?
	$scope.scrub = function() {
		var newTime = parseFloat(this.getActiveTrack().begin) + parseFloat(this.progress);
		this.seekTo(newTime);
	};

  $scope.update = function() {
		angular.element('#playtime').html(
			app.secToMinSec(stereo.getProgress())
		);
		angular.element('#progress').val(stereo.getProgress());

		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			app.next();
		}
		$scope.$apply();
		console.log("THE CONTROLLER HAS UPDATED");
	}

  $scope.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

  $rootScope.$on('stereoUpdate', function(){
		$scope.update();
		$scope.$apply();
	});

});