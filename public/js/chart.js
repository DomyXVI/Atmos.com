let parsedCookies = parseCookie(document.cookie);
let hourly_temperatures = JSON.parse(parsedCookies.hourly_temps.substring(2, parsedCookies.hourly_temps.length));
let hourly_pop = JSON.parse(parsedCookies.hourly_pop.substring(2, parsedCookies.hourly_pop.length));

let hours = getNext24Hours(getLocalTime());
const ctx = document.getElementById('temp_chart');
const ctx2 = document.getElementById('pop_chart');



new Chart(ctx, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Temperature',
            data: hourly_temperatures,
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
                family: "'Montserrat'"
            }
        },
        labels: {
            // This more specific font property overrides the global property
            font: {
                size: 18,
                family: "'Montserrat'"
            }
        },
        plugins: {
            tooltip: {
              callbacks: {
                label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} °C`,
            }
            }
          }
    },

});



new Chart(ctx2, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Precipitation',
            data: hourly_pop,
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Probability of Rain'
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
                family: "'Montserrat'"
            }
        },
        labels: {
            // This more specific font property overrides the global property
            font: {
                size: 18,
                family: "'Montserrat'"
            }
        },
        plugins: {
            tooltip: {
              callbacks: {
                label: (item) =>
                `${item.dataset.label}: ${item.formattedValue}%`,
            }
            }
          }
    },

});

