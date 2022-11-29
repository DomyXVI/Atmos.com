let parsedCookies = parseCookie(document.cookie);
let values = JSON.parse(parsedCookies.hourly_temps.substring(2, parsedCookies.hourly_temps.length));
let hours = getNext24Hours(getLocalTime());
console.log(hours);
const ctx = document.getElementById('myChart');



new Chart(ctx, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Temperature',
            data: values,
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (Celsius)'
                }
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (h from now)',
                }
            },
        },
        ticks: {
            // This more specific font property overrides the global property
            font: {
                size: 13,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
        },
        labels: {
            // This more specific font property overrides the global property
            font: {
                size: 18,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
        }
    },

});
