function changeWidth(size) {
    var table = document.getElementById("main-table");
    table.style.width = size;
}

function changeSpacing(size) {
    var table = document.getElementById("main-table");
    table.style.borderSpacing = size;
    table.style.border = "black " + size + "px solid";
}

function changeColor(color) {
    var table = document.getElementById("main-table");
    table.style.backgroundColor = color;
    table.style.border = "black " + 1 + "px solid";
}

function reset() {
    changeWidth(200);
    changeSpacing(2);
    changeColor("lightgreen");
}
