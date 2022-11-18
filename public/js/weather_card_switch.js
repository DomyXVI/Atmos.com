function weatherCardSwitch(number){

    if(number == 0){
        document.getElementById("visibility-0").style.display = "flex";
    }else{
        document.getElementById("visibility-0").style.display = "none";
    }

    for(let i = 0;i<5;i++){
        if(i != number) {
            document.getElementById("icon-"+i).style.display = "none";
            document.getElementById("temp-"+i).style.display = "none";
            document.getElementById("feels-like-"+i).style.display = "none";
            document.getElementById("description-"+i).style.display = "none";
            document.getElementById("wind-"+i).style.display = "none";
            document.getElementById("pressure-"+i).style.display = "none";
            document.getElementById("humidity-"+i).style.display = "none";
            document.getElementById("min-max-"+i).style.display = "none";
        }
    }

    document.getElementById("icon-"+number).style.display = "block";
    document.getElementById("temp-"+number).style.display = "block";
    document.getElementById("feels-like-"+number).style.display = "block";
    document.getElementById("description-"+number).style.display = "block";
    document.getElementById("wind-"+number).style.display = "block";
    document.getElementById("pressure-"+number).style.display = "block";
    document.getElementById("humidity-"+number).style.display = "block";
    document.getElementById("min-max-"+number).style.display = "block";
    
}