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
		$("#source").css({"border-color": "#c22"});
		$("#dest").css({"border-color": "initial"});
	});

	$("#dest").click(function() {
		state = "dest";
		$("#dest").css({"border-color": "#22c"});
		$("#source").css({"border-color": "initial"});
	});
	
	$("#map").click(function(e) {
		var offset = $(this).offset();
		
		if (state == "source") {
			sourceX = e.pageX - offset.left;
			sourceY = e.pageY - offset.top;
			console.log("source set");
			$("#sourcepin").css({"top": (sourceY - 30) + "px", "left": sourceX + "px", "display": "initial"})
		}
		
		if (state == "dest") {
			destX = e.pageX - offset.left;
			destY = e.pageY - offset.top;
			console.log("destination set");
			$("#destpin").css({"top": (destY - 30) + "px", "left": destX + "px", "display": "initial"})
		}
		
		if(sourceX > 0 && destX > 0) {
			distance = Math.sqrt(Math.pow(sourceX-destX, 2) + Math.pow(sourceY-destY, 2)) / $("#map").width() * 1670; // map width is 1670 miles at central lattitude.
			$("#distance").text("Distance: " + distance.toFixed(0) + " miles");
			$("#hyperloop").text("Approximate hyperloop time: " + formatTime(distance / 600));
			$("#car").text("Approximate driving time: " + formatTime(distance / 55));
			$("#air").text("Approximate airplane travel time: " + formatTime(distance / 575));
			$("#airinfo").text("All times only include time spent moving. Airport security, highway traffic, and other possible delays are not accounted for.");
			$("#hcost").text("Approximate hyperloop ticket cost: $" + (20 + distance * 0.1).toFixed(2));
			$("#ccost").text("Approximate fuel cost for cars: $" + (distance / 30 * 2.50).toFixed(2));
			$("#acost").text("Approximate airline ticket cost: $" + (120 + distance * 0.15).toFixed(2));
			$("#costinfo").text("Costs, especially for airline tickets, very greatly. Hyperloop and airline estimates are based on both locations supporting medium to high capacity airport or hyperloop facilities. Car fueling costs based on 30 MPH fuel economy.");
		}
	});
	
	console.log("Scripts loaded");
	
});

function formatTime(t) {
	h = Math.floor(t);
	m = ((t-Math.floor(t)) * 60).toFixed(0);
	if (h == 1) {
		h1 = " hour, ";
	} else {
		h1 = " hours, ";
	}
	if (m == 1) {
		m1 = " minute";
	} else {
		m1 = " minutes";
	}
	if (h > 0){
		return h + h1 + m + m1;
	} else {
		return m + m1;
	}
}