/* Please don't read this. It's about 1am right now. */

var svg = d3.select("#about-svg")

var width;
var height;

// state variable
var loaded = false;

// Data
var likeList = [
  ['Cooking', 'img/about-0.jpg'],
  ['Road Trips', 'img/about-1.jpg' ],
  ['Music and Guitar', 'img/about-4.jpg']
];
var dislikeList = [
  ['Traffic and long checkout lines', 'img/about-2.jpg'],
  ['Being wet', 'img/about-3.jpg'],
  ['When one headphone stops working', 'img/about-5.jpg']
];

(function main () {
  getDimensions();
  $(window).on('resize', onResizeHandler);
  $(window).on('DOMContentLoaded load resize scroll', onVisibilityChange($('#about'), function() {
    drawCenterLine();
    populateLikeList();
    populateDislikeList();
  })); 
  headings();
})();


function populateDislikeList() {
  for(var i=0; i<likeList.length; i++) {
    svg.append("svg:image")
      .attr("xlink:href", dislikeList[i][1])
      .attr("width", 300)
      .attr("height", 300)
      .attr("x", width/2 + width/16)
      .attr("y", 36 + 20 + 300*i +20*i)
      .classed("fadeInFromNoneAnimation", true);
    svg.append("text")
      .attr("x", width - 50)             
      .attr("y", 200 + 320*i)
      .attr("text-anchor", "end")  
      .style("font-size", "24px")
      .style('fill', '#B0171F')
      .style('font-family', 'garamond')
      .style('font-weight', 'bold')
      .classed("fadeInFromNoneAnimation", true)
      .text(dislikeList[i][0]);
  }
}

function populateLikeList() {
  for(var i=0; i<likeList.length; i++) {
    svg.append("svg:image")
      .attr("xlink:href", likeList[i][1])
      .attr("width", 300)
      .attr("height", 300)
      .attr("x", width/16)
      .attr("y", 36 + 20 + 300*i +20*i)
      .classed("fadeInFromNoneAnimation", true);
    svg.append("text")
      .attr("x", width/2 - 50)             
      .attr("y", 200 + 320*i)
      .attr("text-anchor", "end")  
      .style("font-size", "24px")
      .style('fill', '#50C878')
      .style('font-family', 'garamond')
      .style('font-weight', 'bold')
      .classed("fadeInFromNoneAnimation", true)
      .text(likeList[i][0]);
  }
}

function headings() {
  svg.append("text")
    .attr("x", (width / 4))             
    .attr("y", 36)
    .attr("text-anchor", "middle")  
    .style("font-size", "36px")
    .style('fill', '#50C878')
    .style('font-family', 'garamond')
    .style('font-weight', 'bold')
    .text("Things I Like");
  svg.append("text")
    .attr("x", (width *3/4))             
    .attr("y", 36)
    .attr("text-anchor", "middle")  
    .style("font-size", "36px")
    .style('fill', '#B0171F')
    .style('font-family', 'garamond')
    .style('font-weight', 'bold')
    .text("Things I Don't Like");
          
}

function drawCenterLine()
{
  var data = [0, height];
  var line = d3.line().x(function(d,i) {
    return width/2;
  }).y(function(d, i) {
    return d;
  });
  var path = svg.append("path")
  .attr("d", line(data))
  .attr("stroke", "steelblue")
  .attr("stroke-width", "2")
  .attr("fill", "none");
  var totalLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .attr("stroke-dashoffset", 0);
}

function getDimensions()
{
  var widthString = svg.style("width"); 
  width = widthString.length > 2 ? Number( widthString.substring( 0, widthString.length - 2 ) ) : 0 ;

  var heightString = svg.style("height");
  height = heightString.length > 2 ? Number( heightString.substring( 0, heightString.length - 2 ) ) : 0 ;
}

/* Adapted from http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport */

function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top <=0
    );
}

function onResizeHandler()
{
  if(loaded)
  {
    getDimensions();
    $("#about-svg").empty();
    headings();
    drawCenterLine();
    populateLikeList();
    populateDislikeList();
  }
}

function onVisibilityChange(el, callback) {
    return function () {
        var visible = isElementInViewport(el);
        if (visible && !loaded) {
            loaded = true;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

