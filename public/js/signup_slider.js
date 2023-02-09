setInterval(switchImages, 2850); // 3000 milliseconds = 3 seconds

function switchImages() {
    //var currentDot = document.querySelector(".active");
    //var nextDot = currentDot.nextElementSibling;

    var currentImage = document.querySelector("img:not(.hidden):not(.logo)");

    var nextImage = currentImage.nextElementSibling;

    //if (!nextDot) {
    //    nextDot = document.getElementById("firstDot");
    //}
    if (!nextImage) {
        nextImage = document.getElementById("img1");
    }

    //currentDot.classList.remove("active");
    //nextDot.classList.add("active");

    currentImage.classList.add("hidden");
    nextImage.classList.remove("hidden");
}
