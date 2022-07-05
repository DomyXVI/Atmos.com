/**
 * When the page loads, activate the Google Places API and search for cities.
 * add the cities list to the inputbox
 */

function activatePlacesSearch() {
    let input = document.getElementById('search_term');
    let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });
}