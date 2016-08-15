var projectData;

$(document).ready(function () {
	$(window).resize(function (){
		setPanelHeight();
	});
	init();
});

function setPanelHeight() {
	var windowWidth = $(window).width();
	var panelHeight;
	if(windowWidth > 1200) {
		panelHeight = (windowWidth/3)*3/4;
	} else if(windowWidth > 600 && windowWidth < 1200) {
		panelHeight = (windowWidth/2)*3/4;
	} else {
		panelHeight = (windowWidth)*3/4;
	}
	$(".panel").css('height', panelHeight + 'px');
}

function init() {
	setPanelHeight();
	attachPanelListeners();
	//fillCarousel(projectData["ledcube"]["img-urls"], projectData["ledcube"]["captions"]);
}

function attachPanelListeners() {
	$("a.panel-link").click(function (e) {
		e.preventDefault();
		enableScreenOverlay();
		var project = $(this).attr('data-project');
		emptyCarousel();
		fillCarousel(projectData[project]["img-urls"], projectData[project]["captions"]);
		showCarousel()
	});
}

function loadProjectData() {
	$.getJSON('data/projects.json', function (data) {
		console.log(data);
	});
}

function enableScreenOverlay() {
	$('#screen-overlay').addClass('fadeInFromNoneAnimation');
}

function disableScreenOverlay() {
	$('#screen-overlay').removeClass('fadeInFromNoneAnimation');
}

function showCarousel() {
	$("#project-carousel-wrapper").css('display', 'block');
}

function closeCarousel() {
	$("#project-carousel-wrapper").css('display', 'none');
	disableScreenOverlay();
}

function fillCarousel(urlList, captionList) {
	for(var i=0; i<urlList.length; i++)
	{
		$('<div class="item"><img src="' + urlList[i] + '"><div class="carousel-caption">' + captionList[i] +'</div></div>').appendTo('.carousel-inner');
		$('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
	}
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel-example-generic').carousel();
}

function emptyCarousel() {
	$('.carousel-indicators').empty();
	$('.carousel-inner').empty();
}

projectData = {
	"ledcube": {
		"img-urls": ["img/project-ledcube-0.jpg", "img/project-ledcube-1.jpg", "img/project-ledcube-2.jpg", "img/project-ledcube-3.jpg", "img/project-ledcube-4.jpg", "img/project-ledcube-5.jpg", "img/project-ledcube-6.jpg", "img/project-ledcube-7.jpg", "img/project-ledcube-8.jpg"],
		"captions": ["Finished LED cube", "Base assembly", "Inserting the LED panels", "All LED panels inserted", "First test!", "Constructing each panel", "Bent and cut 512 LEDs", "Constructing each row", "Applying 20V to check current limiter"]
	}
};