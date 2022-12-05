/**
 * When the user clicks the button, show the rocket icon.
 */
function showBufferingIcon() {
    document.getElementById('rocket').style.display = 'block';
}



function geolocateUser() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)

        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en&key=AIzaSyBNbaCOsry-bPOnTqL3Iy0E0B_sV1BHXUQ';

        $.getJSON(GEOCODING).done(function (location) {
            document.getElementById("search_term").value = location.results[0].address_components[3].short_name + ", " + location.results[0].address_components[6].short_name;
            document.getElementById("search_term").style.border = "thick solid #059862";
        })

    }

    function error(err) {
        console.log(err)
        document.getElementById("search_term").style.border = "thick solid #FF4B4B";
    }
};