var onChoicesVideo = false;
var videoStarted = false;

$(document).ready(function() {
  var sources = ['video/video_choise.mp4'];
  $('#videoElement').bind('ended', function() {
    //'this' is the DOM video element
    this.src = sources[0];
    this.controls = false;
    this.load();
    playOrPause();
    onChoicesVideo = true;
    //on ended
    $('#videoElement').bind("ended", function() {

    });
  });
  $("#muteButton").bind("click", function() {
  	if (videoElement.muted) {
  		videoElement.muted = false;
  		$("#muteButton").html("🕪");
  	} else {
  		videoElement.muted = true;
  		$("#muteButton").html("🕨");
  	}
  });
  $("#fullscreenButton").bind("click", function() {
	if(videoElement.requestFullscreen) {
		videoElement.requestFullscreen();
	} else if(videoElement.mozRequestFullScreen) {
		videoElement.mozRequestFullScreen();
	} else if(videoElement.webkitRequestFullscreen) {
		videoElement.webkitRequestFullscreen();
	} else if(videoElement.msRequestFullscreen) {
		videoElement.msRequestFullscreen();
	}
  })
  $('#videoElement').bind('click', function() {
  	console.log(videoStarted);
  	if(!videoStarted) {
  		videoElement.play();
  	}
  });
  //----------------------------------------------------------------------------
});

function btn1() {
	if (window.document.documentMode) {
	  $('#opt1').css({'background':'rgb(232, 15, 15)', 'opacity': '0.21'})
	} else {
	  $('#opt1').css({'background':'rgb(232 15 15 / 21%)'})
	}
  $('.options').css({'display':'none'});
  $("#videoElement").attr("src", "video/video_half1.mp4");
  onChoicesVideo = false
};
function btn2() {
	if (window.document.documentMode) {
	  $('#opt2').css({'background':'rgb(232, 15, 15)', 'opacity': '0.21'})
	} else {
	  $('#opt2').css({'background':'rgb(232 15 15 / 21%)'})
	}
  $('.options').css({'display':'none'});
  $("#videoElement").attr("src", "video/video_half2.mp4");
  onChoicesVideo = false
}
//------------------------------------------------------------------------------
function doFirst(){
	barSize=756;
	videoElement=document.getElementById('videoElement');
	playButton=document.getElementById('playButton');
	bar=document.getElementById('defaultBar');
	progressBar=document.getElementById('progressBar');

	playButton.addEventListener('click', playOrPause, false);
	bar.addEventListener('click', clickedBar, false);

	videoElement.pause();
	playOrPause();
}

function playOrPause() {
	debugger;
	if (!videoElement.paused && !videoElement.ended){
		videoElement.pause();
		playButton.innerHTML='▶';
		window.clearInterval(updateBar);
	} else {
		videoElement.play();
		playButton.innerHTML='❚❚';
		updateBar=setInterval(update, 250);
	}
}
function update() {
	if (!videoElement.ended) {
		if(videoElement.currentTime > 0) {
			videoStarted = true;
		}
		var size=parseInt(videoElement.currentTime*barSize/videoElement.duration);
		progressBar.style.width=size+'px';

		if (onChoicesVideo) {
			if (videoElement.currentTime > 3.3) {
				$('.options').show();
			} else {
				$('.options').hide();
			}
		}
	} else {
		progressBar.style.width='0px';
		playButton.innerHTML='▶';
		window.clearInterval(updateBar);
	}
}
function clickedBar(e){
	if(!videoElement.paused && !videoElement.ended){
		var mouseX=e.pageX-bar.offsetLeft;
		var newtime=mouseX*videoElement.duration/barSize;
		videoElement.currentTime=newtime;
		progressBar.style.width=mouseX+'px';
	}
}
window.addEventListener('load',doFirst,false);
