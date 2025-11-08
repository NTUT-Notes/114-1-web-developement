function changeWidth(size) {
    var table = document.getElementById("course_table");
    table.style.width = size;
}

function changeSpacing(size) {
    var table = document.getElementById("course_table");
    table.style.borderSpacing = size;
    table.style.border = "black " + size + " solid";
}

function changeColor(color) {
    var table = document.getElementById("course_table");
    table.style.backgroundColor = color;
    table.style.border = "black " + 1 + "px solid";
}

function reset() {
    var table = document.getElementById("course_table");

    table.style.width = "";
    table.style.borderSpacing = "";
    table.style.border = "";
    changeColor("lightgreen");
}

function switchFrame(frameFolder) {
    var frame = document.getElementById("frame");
    
    frame.src = "./" + frameFolder + "/index.html"

    var title = document.getElementById("title");
    title.innerText = frameFolder + " Course";
}

window.onload = () => {
    switchFrame("2025-10-29")
}