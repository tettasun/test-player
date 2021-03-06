var audio;

//Hide Pause
$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');
	
	//Create audio object
	audio = new Audio('media/'+ song);

	audio.onended = (event) => {
 		console.log("いべ",event);
 		next();
	};
	
	//Insert audio info
	$('.artist').text(artist);
	$('.title').text(title);
	
	//Insert song cover
	$('img.cover').attr('src','images/covers/'+cover);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
}

//Play button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

//Pause button
$('#pause').click(function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

//Stop button
$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
});

//Next button
$('#next').click(function(){
	next();
});

function next() {
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0){
		return;
		//next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
}

//Prev button
$('#prev').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
});

//Playlist song click
$('#playlist li').click(function(){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	audio.play();
	showDuration();
});

//Volume control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

$("#progress-bar").change(function() {
  const pct = this.value / 100;
  audio.currentTime = (audio.duration || 0) * pct;
});

//Time/Duration
function showDuration(){
	$("#progress-bar").val(0);
	$(audio).bind('timeupdate',function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt(audio.currentTime / 60) % 60;
		if(s < 10){
			s = '0'+s;
		}
		$('#duration').html(m + ':'+ s);
		var value = 0;
		if(audio.currentTime > 0){
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}