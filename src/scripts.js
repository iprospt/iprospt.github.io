var state;
var sourceX;
var sourceY;
var destX;
var destY;

$(document).ready(function() {
	sourceX = -1;
	sourceY = -1;
	destX = -1;
	destY = -1;

	$("#source").click(function() {
		state = "source";
	});

	$("#dest").click(function() {
		state = "dest";
	});
	
	$("#map").click(function(e) {
		var offset = $(this).offset();
		
		if (state == "source") {
			sourceX = e.pageX - offset.left;
			sourceY = e.pageY - offset.top;
			console.log("source set");
			$("#sourcepin").css({"top": (sourceY - 30) + "px", "left": sourceX + "px"})
		}
		
		if (state == "dest") {
			destX = e.pageX - offset.left;
			destY = e.pageY - offset.top;
			console.log("destination set");
			$("#destpin").css({"top": (destY - 30) + "px", "left": destX + "px"})
		}
		
		if(sourceX > 0 && destX > 0) {
			distance = Math.sqrt(Math.pow(sourceX-destX, 2) + Math.pow(sourceY-destY, 2)) / $("#map").width() * 1670; // map width is 1670 miles at central lattitude.
			$("#distance").text("Distance: " + distance.toFixed(0));
		}
	});
});
