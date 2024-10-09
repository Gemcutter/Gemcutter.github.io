$(document).ready(function(){
    $("#burger").click(function(){
        toggleMenu()
    });
    x = document.cookie;
    x = x.split(";")
    cookies = {};
    for (let i in x) {
        tmp = x[i].split("=");
        cookies[tmp[0]] = tmp[1]
    }
    setTimeout(function() {
        if (cookies["menuOpen"]=="true") {
            menuOpen = true
            document.getElementById("sidebar").style.left = "0"
        }
        else {
            menuOpen = false;
        }
        document.getElementById("sidebar").style.transition = "0.5s"
    },20)
    
});

let menuOpen;
function toggleMenu() {
    if (menuOpen) {
        menuOpen = false;
        document.cookie = "menuOpen=false";
        document.getElementById("sidebar").style.left = "-12rem"
    }
    else {
        menuOpen = true;
        document.cookie = "menuOpen=true";
        document.getElementById("sidebar").style.left = "0"
    }
}