var tomorrow = new Date();

tomorrow.setDate(new Date().getDate() + 1);
document.getElementById("secondDay").innerHTML = tomorrow.toDateString().slice(0, -4);
tomorrow.setDate(new Date().getDate() + 2);
document.getElementById("thirdDay").innerHTML = tomorrow.toDateString().slice(0, -4);
tomorrow.setDate(new Date().getDate() + 3);
document.getElementById("fourthDay").innerHTML = tomorrow.toDateString().slice(0, -4);
tomorrow.setDate(new Date().getDate() + 4);
document.getElementById("fifthDay").innerHTML = tomorrow.toDateString().slice(0, -4);