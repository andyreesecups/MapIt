// Set map options
var myLatLng = { lat: 30.307182, lng: -97.755996 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Create map
var map = new
google.maps.Map(document.getElementById("googleMap"), mapOptions);
// Create a directions service object to use the route method and get a result for our request
var directionsService = new
google.maps.DirectionsService();

// Create a directionsRenderer object which will use to display the route
var directionsDisplay = new
google.maps.DirectionsRenderer();


// Append the DirectionsRenderer to the map
directionsDisplay.setMap(map);
// Define a calcRoute function 
function calcRoute() {
    // Create a request
    var request = {
            origin: document.getElementById("from").value,
            destination: document.getElementById("to").value,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
        //Pass the request to the route method
    directionsService.route(request,
        function(result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                // Get distance and time
                $("#output").html("<div class='alert-info'>From: " + document.getElementById("from").value + ".<br/>To: " + document.getElementById("to").value + ".<br/>Driving Distance: " + result.routes[0].legs[0].distance.text + ".<br/> Duration: " + result.routes[0].legs[0].duration.text + ".</div>");

                // Display route
                directionsDisplay.setDirections(result);
            } else {
                // Delete route from map
                directionsDisplay.setDirections({ routes: [] });

                // center map in Austin
                map.setCenter(myLatLng);

                // Show error message
                $("#output").html("<div class='alert-danger'>Make sure to fill in the input boxes.</div>");
            }
        });

}

// ---------- Create autocomplete objects for both inputs ----------//

// --- There must be a bug below. Will come back at a later time to fix -------//
// var options = {
// 	types: ['(cities)']
// }

// var input1 = document.getElementById("from");
// var autocomplete1 = new
// google.maps.places.Autocomplete(input1, options);

// var input2 = document.getElementById("to");
// var autocomplete2 = new
// google.maps.places.Autocomplete(input2, options);
