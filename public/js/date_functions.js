let days = [];
let daysRequired = 4

for (let i = 1; i <= daysRequired; i++) {
    days.push(moment().add(i, 'days').format('MMM Do'))
}

document.getElementById("secondDay").innerHTML = days[0];
document.getElementById("thirdDay").innerHTML = days[1];
document.getElementById("fourthDay").innerHTML = days[2];
document.getElementById("fifthDay").innerHTML = days[3];


function getNext24Hours(startHour) {
    let hours = new Array();
    for (let i = 0; i <= 24; i++) {
        hours[i] = startHour + i;
        if (hours[i] > 24) {
            hours[i] -= 24;
            hours[i] = hours[i] + ":00";
        }else {
            hours[i] = hours[i] + ":00";
        }
    }
    return hours;
}


function getLocalTime() {
    d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    var cityActualTime = utc + (1000 * parsedCookies.timezone)
    nd = new Date(cityActualTime).getHours();
    return nd;
}