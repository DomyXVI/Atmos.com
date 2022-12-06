/**
 * When the user clicks the button, show the rocket icon.
 */
function showBufferingIcon() {
    document.getElementById('rocket').style.display = 'block';
    setTimeout(function () {
        document.getElementById('rocket').style.display = 'none';
    }, 1000);
}



function geolocateUser() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)

        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en&key=AIzaSyBNbaCOsry-bPOnTqL3Iy0E0B_sV1BHXUQ';
        let search_term = document.getElementById("search_term");
        $.getJSON(GEOCODING).done(function (location) {
            search_term.value = location.results[0].address_components[3].short_name + ", " + location.results[0].address_components[6].short_name;
            blinkBorder('#059862', search_term);
        })

    }

    function error(err) {
        console.log(err);
        blinkBorder('#FF4B4B', document.getElementById("search_term"));
    }
};


function hideStatusMessages() {
    let cityNotFoundLabel = document.getElementById("cityNotFound");
    if (!cityNotFoundLabel) return;
    cityNotFoundLabel.style.display = 'none';
}

function blinkBorder(color, element) {
    element.style.border = "thick solid" + color;
    setTimeout(function () {
        element.style.border = "none";
    }, 500);
}