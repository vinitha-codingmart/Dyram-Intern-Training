//Video Modal
function fullScreen(id) {
    document.getElementById("videoPlay1").click();
    console.log(document.getElementById("gridVideoz" + id).getAttribute("src"));
    document.getElementById("videoInModal").setAttribute("src", document.getElementById("gridVideoz" + id).getAttribute("src"));
}

//Menu Display
function menuDisplay() {
    document.getElementById("menu").classList.toggle("show");
}
