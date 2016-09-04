var projectData;

$(document).ready(function () {
	init();
});

function init() {
	$(window).resize(function (){
		setPanelHeight();
	});
	setPanelHeight();
	attachPanelListeners();
	attachAnchorScrollLinks();
	attachOverlayListener();
}


function setPanelHeight() {
	var windowWidth = window.innerWidth;
	var panelHeight;
	if(windowWidth > 1200) {
		panelHeight = (windowWidth/3)*3/4;
	} else if(windowWidth > 750 && windowWidth < 1200) {
		panelHeight = (windowWidth/2)*3/4;
	} else {
		panelHeight = (windowWidth)*3/4;
	}
	$(".panel").css('height', panelHeight + 'px');
}

/**
* Locates anchor links and attaches a click listener that smoothly scrolls to the element whose id
* is equal to the anchor link.
*
* Reference: http://stackoverflow.com/questions/12102118/scrollintoview-animation
*
**/
function attachAnchorScrollLinks() {
	$(".scroll-link").click(function (e) {
		var href = $(this).attr('href')
		if(href!=undefined && href.length>0 && href[0]=="#") {
			e.preventDefault();
			$('html, body').animate({
			    scrollTop: $(href).offset().top
			}, 1000);
		}
	});
}

function attachPanelListeners() {
	$("a.panel-link").click(function (e) {
		e.preventDefault();
		enableScreenOverlay();
		var project = $(this).attr('data-project');
		emptyCarousel();
		fillCarousel(projectData[project]["img-urls"], projectData[project]["captions"], projectData[project]["description"]);
		showCarousel();
	});
}

function attachOverlayListener() {
	$('#screen-overlay').click(function (e){
		closeCarousel();
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

function fillCarousel(urlList, captionList, description) {
	$("#carousel-project-description").html(description);

	for(var i=0; i<urlList.length; i++)
	{
		if(i<captionList.length)
		{
			if(urlList[i].split("/")[0]=="vid")
			{
				$('<div class="item"><video class="carousel-video" src="' + urlList[i] + '" controls/><div class="carousel-caption">' + captionList[i] +'</div></div>').appendTo('.carousel-inner');
			} else if(urlList[i].includes("youtube.com/embed"))
			{
				$('<div class="item"><div class="carousel-video-wrapper"><iframe class="carousel-video" src="' + urlList[i] + '" frameborder="0" allowfullscreen></iframe></div><div class="carousel-caption">' + captionList[i] +'</div></div>').appendTo('.carousel-inner');
			}
			else // image
			{
				$('<div class="item"><img class="carousel-img" src="' + urlList[i] + '"><div class="carousel-caption">' + captionList[i] +'</div></div>').appendTo('.carousel-inner');
			}
	
		} else {
			console.log("Missing captions");
			//$('<div class="item"><img class="carousel-img" src="' + urlList[i] + '"><div class="carousel-caption">' + "" +'</div></div>').appendTo('.carousel-inner');
		}
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
		"img-urls": ["https://www.youtube.com/embed/8kPiyt_1kfw", "img/project-ledcube-0.jpg", "img/project-ledcube-1.jpg", "img/project-ledcube-2.jpg", "img/project-ledcube-3.jpg", "img/project-ledcube-4.jpg", "img/project-ledcube-5.jpg", "img/project-ledcube-6.jpg", "img/project-ledcube-7.jpg", "img/project-ledcube-8.jpg", "img/project-ledcube-9.jpg" ],
		"captions": ["", "Finished LED cube", "Base assembly", "Inserting the LED panels", "All LED panels inserted", "First test!", "Constructing each panel", "Bent and cut 512 LEDs", "Constructing each row", "Applying 20V to check current limiter", "PCB layout"],
		"description": "An 8x8x8 LED cube made and designed from scratch."
	},
	"ndt": {
		"img-urls": ["img/project-ndt-0.jpg", "img/project-ndt-1.jpg", "img/project-ndt-2.jpg", "img/project-ndt-3.jpg", "img/project-ndt-4.jpg", "img/project-ndt-5.jpg", "img/project-ndt-6.jpg", "img/project-ndt-7.jpg", "img/project-ndt-8.jpg", "img/project-ndt-9.jpg"],
		"captions": ["Machine learning results visualization", "One of many pipe samples used in this research", "Signal of reflections from pipe", "Apparatus", "LPF to remove noise and extract peaks", "LPF to remove noise and extract peaks", "Signal of reflections from steel with primer", "Cross correlation", "Mathematical model of attentuation in adhesive with 99% and 95% confidence interval", "Analyzing the decay constant of steel reverbs in pipes with strong bonds and weak bonds."],
		"description": "Identifying regions of weak bonding is particularly challenging using traditional ultrasonic methods for two reasons. First, instead of complete delamination in weak bonds, there remains high acoustic contact between the adhesive and primer so that interface reflections are minimal (a 'kissing' bond), and second, there are uncertainties with material/layer properties. A machine learning approach is adopted so that statistically significant changes in the data can be observed in the presence of layer property variations. Features are extracted from pulse-echo signals obtained by applying an ultrasonic broadband pulse to the pipe exterior."
	},
	"geochat": {
		"img-urls": ["img/project-geochat-0.jpg","img/project-geochat-1.jpg","img/project-geochat-2.jpg","img/project-geochat-3.jpg"],
		"captions": ["","","","Backend design"],
		"description": "Hack The North 2014. GeoChat is an app that geocontextifies chatrooms. There is no account sign up. Simply open the app and add an alias to get started. You can create a room by providing a room name and a limiting radius or you can join existing rooms in your area."
	},
	"route-planner": {
		"img-urls": ["img/project-route-planner-0.jpg", "img/project-route-planner-1.jpg"],
		"captions": ["App draws route on google maps using polylines", "Screen capture of demo (see link below)"],
		"description": "As the UTEK 2015 Programming Competition director, design a competition package to test student's problem solving, and ability to design and write software. Click here to see the <a href=\"docs/UTEK-2016-Programming-Competition-Competitors-Package-FINAL.docx\">competition package</a>. See a prototype on <a target=\"_blank\" href=\"http://toronto-route-planner.herokuapp.com/\">heroku</a>."
	},
	"ss": {
		"img-urls": ["img/project-ss-0.jpg", "img/project-ss-1.jpg", "img/project-ss-2.jpg", "img/project-ss-3.jpg"],
		"captions": ["", "Power subsystem board layout", "Battery characterization", "Battery characterization"],
		"description": "Power subsystem of a 3U CubeSat built by the University of Toronto Aerospace Team"
	},
	"house-doctor": {
		"img-urls": ["img/project-house-doctor-0.jpg","img/project-house-doctor-1.jpg","img/project-house-doctor-2.jpg"],
		"captions": ["","",""],
		"description": "UofT Hacks 2015. An android app that scrapes medical information using Bing API and delivers it via SMS using the twilio API."
	},
	"fan": {
		"img-urls": ["https://www.youtube.com/embed/OeW7NYT0q_o", "img/project-fan-0.jpg", "img/project-fan-1.jpg", "img/project-fan-2.jpg"],
		"captions": ["", "", "", ""],
		"description": "UofT Hacks 2014. Please ignore my beard. Using the Myo, Intel Edison, transistors, relays and logic gates to create a gesture-controlled fan."
	},
	"template": {
		"img-urls": [],
		"captions": [],
		"description": ""
	}
};